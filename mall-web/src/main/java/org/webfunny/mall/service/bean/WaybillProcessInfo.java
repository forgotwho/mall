  
package org.webfunny.mall.service.bean;

import com.thoughtworks.xstream.annotations.XStreamAlias;

@XStreamAlias("WaybillProcessInfo")
public class WaybillProcessInfo {

	@XStreamAlias("name")
	private String Waybill_No;
	@XStreamAlias("name")
	private String Upload_Time;
	@XStreamAlias("name")
	private String ProcessInfo;
	public String getWaybill_No() {
		return Waybill_No;
	}
	public void setWaybill_No(String waybill_No) {
		Waybill_No = waybill_No;
	}
	public String getUpload_Time() {
		return Upload_Time;
	}
	public void setUpload_Time(String upload_Time) {
		Upload_Time = upload_Time;
	}
	public String getProcessInfo() {
		return ProcessInfo;
	}
	public void setProcessInfo(String processInfo) {
		ProcessInfo = processInfo;
	}
}
