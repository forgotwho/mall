package org.webfunny.mall.service.util;

import java.io.IOException;

import org.webfunny.mall.service.bean.ComResult;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import okhttp3.OkHttpClient;
import okhttp3.Request;

public class ExpressUtil {

	private static String kuaidi100 = "4a951de15be1d9a9";

	private OkHttpClient client = new OkHttpClient();

	private ObjectMapper objectMapper = new ObjectMapper();

	public ExpressUtil() {
		objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
	}

	public ComResult getResult(String ticketNumber) throws IOException {
		String url = "http://api.kuaidi100.com/api?id=" + kuaidi100 + "&nu=" + ticketNumber
				+ "&com=&show=0&muti=1&order=desc";
		url = "http://www.kuaidi100.com/applyurl?key=" + kuaidi100 + "&com=" + "yuantong" + "&nu=" + ticketNumber;

		Request request = new Request.Builder().url(url).build();
		okhttp3.Response response = client.newCall(request).execute();
		if (response.isSuccessful()) {
			ComResult result = objectMapper.readValue(response.body().string(), ComResult.class);
			System.out.println(result);
			return result;
		}
		return null;
	}

	public String getVendor(String ticketNumber) throws IOException {
		String comCode = "";
		String url = "https://m.kuaidi100.com/autonumber/auto?num=" + ticketNumber;
		Request request = new Request.Builder().url(url).build();
		okhttp3.Response response = client.newCall(request).execute();
		if (response.isSuccessful()) {
			String result = response.body().string();
			JSONArray companys = JSON.parseArray(result);
			if (companys != null && !companys.isEmpty()) {
				JSONObject company = (JSONObject) companys.get(0);
				comCode = company.getString("comCode");
			}
		}
		return comCode;
	}

	public Object getVendorResult(String ticketNumber, String comCode) throws IOException {
		String url = "https://m.kuaidi100.com/query?type=" + comCode + "&postid=" + ticketNumber + "&id=1&valicode=";
		Request request = new Request.Builder().url(url).build();
		okhttp3.Response response = client.newCall(request).execute();
		if (response.isSuccessful()) {
			String result = response.body().string();
			JSONObject data = JSON.parseObject(result);
			return data;
		}
		return null;
	}

//	public static void main(String[] args) {
//		ExpressUtil test = new ExpressUtil();
//		try {
//			String comCode = test.getVendor("811979696383");
//			System.out.println(comCode);
//			Object result = test.getVendorResult("811979696383", comCode);
//			System.out.println(result);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}
}
