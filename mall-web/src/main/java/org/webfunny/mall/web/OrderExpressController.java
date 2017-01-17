package org.webfunny.mall.web;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.webfunny.mall.service.bean.OrderExpressBean;
import org.webfunny.mall.service.bean.WaybillProcessInfo;
import org.webfunny.mall.service.bean.WaybillProcessInfoResult;
import org.webfunny.mall.service.entity.OrderExpress;
import org.webfunny.mall.service.repository.OrderExpressRepository;
import org.webfunny.mall.service.util.MD5Util;
import org.webfunny.mall.service.util.XMLUtil;

@RestController
@RequestMapping("/api/order")
public class OrderExpressController {
	
	private static String urlStr = "http://58.32.246.70:8002";
	private static String user_id = "EFUNBEST";
	private static String app_key = "gKlwaN";
	private static String format = "XML";
	private static String method = "yto.Marketing.WaybillTrace";
	private static String v = "1.01";
	private static String secretKey = "1MhIlN";
	private static String dateFormat = "yyyy-MM-dd HH:mm:ss";
	

	@Autowired
	private OrderExpressRepository orderExpressRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<OrderExpressBean> list(HttpServletResponse response) {
		List<OrderExpress> orderExpressList = new ArrayList<OrderExpress>();
		orderExpressList = (List<OrderExpress>) orderExpressRepository.findAll();
		List<OrderExpressBean> orderExpressBeanList = new ArrayList<OrderExpressBean>();
		Long index = 1L;
		for (OrderExpress orderExpress : orderExpressList) {
			orderExpressBeanList.add(new OrderExpressBean(orderExpress.getId(), orderExpress.getOrderId(),
					orderExpress.getExpressId(), index++));
		}
		return orderExpressBeanList;
	}
	
	@RequestMapping(value = "/search",method = RequestMethod.GET)
	public Page<OrderExpressBean> page(@RequestParam(value = "page", required = false) Integer page,HttpServletResponse response) {
		if(page==null||page.intValue()==0){
			page = 1; 
		}
		page = page -1;
		Integer size = 10;
		Sort sort = new Sort(Direction.DESC, "id");
		Pageable pageable = new PageRequest(page,size,sort);
		Page<OrderExpress> orderExpressPage = (Page<OrderExpress>) orderExpressRepository.findAll(pageable);
		List<OrderExpressBean> orderExpressBeanList = new ArrayList<OrderExpressBean>();
		Long index = Long.valueOf(orderExpressPage.getNumber()*orderExpressPage.getSize())+1;
		for (OrderExpress orderExpress : orderExpressPage.getContent()) {
			orderExpressBeanList.add(new OrderExpressBean(orderExpress.getId(), orderExpress.getOrderId(),
					orderExpress.getExpressId(), index++));
		}
		Pageable orderPage = new PageRequest(orderExpressPage.getNumber(),orderExpressPage.getSize());
		Page<OrderExpressBean> orderResult = new PageImpl<OrderExpressBean>(orderExpressBeanList,orderPage,orderExpressPage.getTotalElements());
		return orderResult;
	}

	@RequestMapping(value = "/receive/{orderId}", method = RequestMethod.GET)
	public WaybillProcessInfoResult receiveAndSendMessageService(@PathVariable String orderId) {
		WaybillProcessInfoResult waybillProcessInfoResult = new WaybillProcessInfoResult();
		try{
			List<OrderExpress> orderExpressList = orderExpressRepository.findByOrderId(orderId);
			OrderExpress orderExpress = null;
			if (orderExpressList == null || orderExpressList.isEmpty()) {
				return waybillProcessInfoResult;
			} else {
				orderExpress = orderExpressList.get(0);
			}
			//System.out.println("getExpressId="+orderExpress.getExpressId());
			SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
			String timestamp = sdf.format(new Date());
			
			String number = orderExpress.getExpressId();
			
			StringBuffer sb = new StringBuffer();
			sb.append("app_key").append(app_key).append("format").append(format).append("method").append(method)
			.append("timestamp").append(timestamp).append("user_id").append(user_id).append("v").append(v);
			
			String sign = secretKey + sb.toString();
			sign = MD5Util.MD5Encode(sign, "GBK");
			sign = sign.toUpperCase();
			String parameter = "sign=" + sign + "&app_key=" + app_key + "&format=" + format + "&method=" + method
					+ "&timestamp=" + timestamp + "&user_id=" + user_id + "&v=" + v
					+ "&param=<?xml version=\"1.0\"?><ufinterface><Result><WaybillCode><Number>" + number
					+ "</Number></WaybillCode></Result></ufinterface>";
			//System.out.println("parameter="+parameter);
			URL url = new URL(urlStr);
			URLConnection con = url.openConnection();
			con.setDoOutput(true);
			con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded charset=UTF-8");
			
			OutputStreamWriter out = new OutputStreamWriter(con.getOutputStream());
			out.write(new String(parameter.getBytes("UTF-8")));
			out.flush();
			out.close();
			BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String line = "";
			StringBuffer resultSB = new StringBuffer();
			for (line = br.readLine(); line != null; line = br.readLine()) {
				resultSB.append(line.trim());
			}
			Map map = XMLUtil.doXMLParse(resultSB.toString());
			if(map.containsKey("Result")){
				String result = (String)map.get("Result");
				result = "<Result>" + result + "</Result>";
				waybillProcessInfoResult = XMLUtil.toBean(result, WaybillProcessInfoResult.class);
				List<WaybillProcessInfo> list = waybillProcessInfoResult.getList();
				if(list!=null&&!list.isEmpty()){
					Collections.reverse(list);
					waybillProcessInfoResult.setList(list);
				}
			}
			waybillProcessInfoResult.setExpressId(orderExpress.getExpressId());
		}catch(Exception e){
			e.printStackTrace();
		}
		return waybillProcessInfoResult;
	}

	@RequestMapping(value = "/{orderId}", method = RequestMethod.GET)
	public OrderExpress get(@PathVariable String orderId) {
		List<OrderExpress> orderExpressList = orderExpressRepository.findByOrderId(orderId);
		OrderExpress orderExpress = null;
		if (orderExpressList == null || orderExpressList.isEmpty()) {
			orderExpress = new OrderExpress("", "");
		} else {
			orderExpress = orderExpressList.get(0);
		}
		return orderExpress;
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
	public OrderExpress get(@PathVariable Long id) {
		OrderExpress orderExpress = orderExpressRepository.findOne(id);
		if (orderExpress == null) {
			orderExpress = new OrderExpress("", "");
		}
		return orderExpress;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	public boolean add(@RequestParam(value = "orderId", required = true) String orderId,
			@RequestParam(value = "expressId", required = true) String expressId) {
		OrderExpress orderExpress = new OrderExpress(orderId, expressId);
		orderExpress = orderExpressRepository.save(orderExpress);
		if (orderExpress != null && orderExpress.getId() != null) {
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public void upload(@RequestParam("file") MultipartFile file) {
		List<OrderExpress> orderExpressList = new ArrayList<OrderExpress>();
		try {
			if (!file.isEmpty()) {
				String fileName = file.getOriginalFilename();
				fileName = fileName.substring(fileName.lastIndexOf("."));
				if (fileName.equalsIgnoreCase(".xls")) {
					// Excel文件
					HSSFWorkbook wb = new HSSFWorkbook(file.getInputStream());
					OrderExpress orderExpress = null;
					// Excel工作表
					HSSFSheet sheet = wb.getSheetAt(0);
					for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
						HSSFRow row = sheet.getRow(i);
						String orderId = row.getCell(0).getStringCellValue();
						String expressId = row.getCell(1).getStringCellValue();
						orderExpress = new OrderExpress(orderId, expressId);
						if(StringUtils.isEmpty(orderId)){
							continue;
						}
						orderExpressList.add(orderExpress);
					}
				} else if (fileName.equalsIgnoreCase(".xlsx")) {
					// Excel文件
					XSSFWorkbook wb = new XSSFWorkbook(file.getInputStream());
					OrderExpress orderExpress = null;
					// Excel工作表
					XSSFSheet sheet = wb.getSheetAt(0);
					for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
						XSSFRow row = sheet.getRow(i);
						String orderId = row.getCell(0).getStringCellValue();
						String expressId = row.getCell(1).getStringCellValue();
						orderExpress = new OrderExpress(orderId, expressId);
						if(StringUtils.isEmpty(orderId)){
							continue;
						}
						orderExpressList.add(orderExpress);
					}
				}
				orderExpressRepository.save(orderExpressList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "edit/{id}", method = RequestMethod.POST)
	public boolean edit(@PathVariable Long id, @RequestParam(value = "orderId", required = true) String orderId,
			@RequestParam(value = "expressId", required = false) String expressId) {
		OrderExpress orderExpress = new OrderExpress(orderId, expressId);
		orderExpress.setId(id);
		orderExpress = orderExpressRepository.save(orderExpress);
		if (orderExpress != null && orderExpress.getId() == id) {
			return true;
		}
		return false;
	}

	@RequestMapping(value = "batchDelete", method = RequestMethod.POST)
	public boolean deleteBatch(@RequestParam(value = "ids", required = true) String ids) {
		for (String id : ids.split(",")) {
			orderExpressRepository.delete(Long.parseLong(id));
		}
		return true;
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.POST)
	public boolean delete(@PathVariable Long id) {
		orderExpressRepository.delete(id);
		return true;
	}

	@RequestMapping(value = "deleteAll", method = RequestMethod.POST)
	public boolean deleteAll() {
		orderExpressRepository.deleteAll();
		return true;
	}
}
