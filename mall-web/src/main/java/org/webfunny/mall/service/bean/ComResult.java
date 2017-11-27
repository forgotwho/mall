
package org.webfunny.mall.service.bean;

import java.util.List;

public class ComResult {

	private String message;

	private String status;

	private List<ComResultDetail> data;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<ComResultDetail> getData() {
		return data;
	}

	public void setData(List<ComResultDetail> data) {
		this.data = data;
	}

}
