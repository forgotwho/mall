package org.webfunny.mall.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.webfunny.mall.service.bean.OrderExpressBean;
import org.webfunny.mall.service.bean.WaybillProcessInfo;
import org.webfunny.mall.service.entity.OrderExpress;
import org.webfunny.mall.service.repository.OrderExpressRepository;

@RestController
@RequestMapping("/api/order")
public class OrderExpressController {

	@Autowired
	private OrderExpressRepository orderExpressRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<OrderExpressBean> list(HttpServletResponse response) {
		List<OrderExpress> orderExpressList = new ArrayList<OrderExpress>();
		orderExpressList = (List<OrderExpress>)orderExpressRepository.findAll();
		List<OrderExpressBean> orderExpressBeanList = new ArrayList<OrderExpressBean>();
		Long index = 1L;
		for(OrderExpress orderExpress:orderExpressList){
			orderExpressBeanList.add(new OrderExpressBean(orderExpress.getId(), orderExpress.getOrderId(),orderExpress.getExpressId(),index++));
		}
		return orderExpressBeanList;
	}
	
	@RequestMapping(value = "/receive/{orderId}", method = RequestMethod.GET)
	public List<WaybillProcessInfo> receiveAndSendMessageService(@PathVariable String orderId) {
		List<OrderExpress> orderExpressList = orderExpressRepository.findByOrderId(orderId);
		OrderExpress orderExpress = null;
		if(orderExpressList==null||orderExpressList.isEmpty()){
			orderExpress = new OrderExpress("","");
		}else{
			orderExpress = orderExpressList.get(0);
		}
		String user_id = "yto_user";
		String app_key = "ABCDEF";
		String format = "XML";
		String method = "yto.Marketing.WaybillTrace";
		String timestamp = "2016-6-1 13:14:35";
		String v = "1.01";
		String secretKey = "123456";
		
		String number = "710024476256";
		
		StringBuffer sb = new StringBuffer();
		sb.append("app_key").append(app_key)
		.append("format").append(format)
		.append("method").append(method)
		.append("timestamp").append(timestamp)
		.append("user_id").append(user_id)
		.append("v").append(v);
		
		String sign = secretKey+sb.toString();
		sign = MD5Encoder.encode(sign.getBytes());
		sign = sign.toUpperCase();
		String parameter = "sign="+sign+"&app_key="+app_key+"&format="+format+"&method="+method+"&timestamp="+timestamp+"&user_id="+user_id+"&v="+v+"&param=<!--?xml  version=\"1.0\"><ufinterface><Result><WaybillCode><Number>"+number+"</Number></WaybillCode></Result></ufinterface>";
		List<WaybillProcessInfo> result = new ArrayList<WaybillProcessInfo>();
		
		return result;
	}
	
	@RequestMapping(value = "/{orderId}", method = RequestMethod.GET)
	public OrderExpress get(@PathVariable String orderId) {
		List<OrderExpress> orderExpressList = orderExpressRepository.findByOrderId(orderId);
		OrderExpress orderExpress = null;
		if(orderExpressList==null||orderExpressList.isEmpty()){
			orderExpress = new OrderExpress("","");
		}else{
			orderExpress = orderExpressList.get(0);
		}
		return orderExpress;
	}
	
	@RequestMapping(value = "get/{id}", method = RequestMethod.GET)
	public OrderExpress get(@PathVariable Long id) {
		OrderExpress orderExpress = orderExpressRepository.findOne(id);
		if(orderExpress==null){
			orderExpress = new OrderExpress("","");
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
		try{
			if(!file.isEmpty()){
				String fileName = file.getOriginalFilename();
				fileName = fileName.substring(fileName.lastIndexOf("."));
				if(fileName.equalsIgnoreCase(".xls")){
					//Excel文件
					HSSFWorkbook wb = new HSSFWorkbook(file.getInputStream());
					OrderExpress orderExpress = null;
					//Excel工作表
					HSSFSheet sheet = wb.getSheetAt(0);
					for(int i=1; i<sheet.getLastRowNum()+1; i++) {
						HSSFRow row = sheet.getRow(i);
						String orderId = row.getCell(0).getStringCellValue();
						String expressId = row.getCell(1).getStringCellValue();
						orderExpress = new OrderExpress(orderId,expressId);
						orderExpressList.add(orderExpress);
					}
				}else if(fileName.equalsIgnoreCase(".xlsx")){
					//Excel文件
					XSSFWorkbook wb = new XSSFWorkbook(file.getInputStream());
					OrderExpress orderExpress = null;
					//Excel工作表
					XSSFSheet  sheet = wb.getSheetAt(0);
					for(int i=1; i<sheet.getLastRowNum()+1; i++) {
						XSSFRow row = sheet.getRow(i);
						String orderId = row.getCell(0).getStringCellValue();
						String expressId = row.getCell(1).getStringCellValue();
						orderExpress = new OrderExpress(orderId,expressId);
						orderExpressList.add(orderExpress);
					}
				}
				orderExpressRepository.save(orderExpressList);
			}
		}catch(Exception e){
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
		for(String id : ids.split(",")){
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
