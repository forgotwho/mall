  
package org.webfunny.mall.service.bean;

import java.util.List;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamImplicit;

@XStreamAlias("Result")
public class WaybillProcessInfoResult {

	@XStreamImplicit
    private List<WaybillProcessInfo> list;

	public List<WaybillProcessInfo> getList() {
		return list;
	}

	public void setList(List<WaybillProcessInfo> list) {
		this.list = list;
	}
}
