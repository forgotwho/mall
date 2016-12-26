package org.webfunny.mall.service.bean;

public class OrderExpressBean {

    private Long id;
    private String orderId;
    private String expressId;
    private Long index;

    protected OrderExpressBean() {}
    
    public OrderExpressBean(Long id,String orderId, String expressId,Long index) {
    	super();
    	this.id = id;
        this.orderId = orderId;
        this.expressId = expressId;
        this.index = index;
    }

    @Override
    public String toString() {
        return String.format(
                "OrderExpress[id=%d, orderId='%s', expressId='%s']",
                id, orderId, expressId);
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getExpressId() {
		return expressId;
	}

	public void setExpressId(String expressId) {
		this.expressId = expressId;
	}

	public Long getIndex() {
		return index;
	}

	public void setIndex(Long index) {
		this.index = index;
	}
}

