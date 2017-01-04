  
package org.webfunny.mall.service.bean;  


public class WaybillRequest {

	private String waybillNo;
	private String uploadTime;
	private String processInfo;
	public String getWaybillNo() {
		return waybillNo;
	}
	public void setWaybillNo(String waybillNo) {
		this.waybillNo = waybillNo;
	}
	public String getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(String uploadTime) {
		this.uploadTime = uploadTime;
	}
	public String getProcessInfo() {
		return processInfo;
	}
	public void setProcessInfo(String processInfo) {
		this.processInfo = processInfo;
	}
}
