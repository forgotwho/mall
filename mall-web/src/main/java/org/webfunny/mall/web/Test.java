package org.webfunny.mall.web;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.webfunny.mall.service.bean.WaybillProcessInfoResult;
import org.webfunny.mall.service.util.MD5Util;
import org.webfunny.mall.service.util.XMLUtil;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class Test {

	public static void main(String[] args) {
		try {
			String urlStr = "http://58.32.246.70:8002";
			String user_id = "EFUNBEST";
			String app_key = "gKlwaN";
			String format = "XML";
			String method = "yto.Marketing.WaybillTrace";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String timestamp = sdf.format(new Date());
			String v = "1.01";
			String secretKey = "1MhIlN";

			String number = "1234567890";

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

			URL url = new URL(urlStr);
			URLConnection con = url.openConnection();
			con.setDoOutput(true);
			con.setRequestProperty("Pragma:", "no-cache");
			con.setRequestProperty("Cache-Control", "no-cache");
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
			WaybillProcessInfoResult waybillProcessInfoResult = new WaybillProcessInfoResult();
			if(map.containsKey("Result")){
				String result = (String)map.get("Result");
				result = "<Result>" + result + "</Result>";
				waybillProcessInfoResult = toBean(result, WaybillProcessInfoResult.class);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static String toXml(Object obj) {
        XStream xstream = new XStream(new DomDriver("utf8"));
        xstream.processAnnotations(obj.getClass()); // 识别obj类中的注解
        return xstream.toXML(obj);
    }
    
    public static <T> T toBean(String xmlStr, Class<T> cls) {
        XStream xstream = new XStream(new DomDriver());
        xstream.processAnnotations(cls);
        @SuppressWarnings("unchecked")
        T t = (T) xstream.fromXML(xmlStr);
        return t;
    }
}
