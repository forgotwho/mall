package org.webfunny.mall.service.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class OrderExpress {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String orderId;
    private String expressId;
    private Date createTime;

    protected OrderExpress() {}
    
    public OrderExpress(String orderId, String expressId) {
    	super();
        this.orderId = orderId;
        this.expressId = expressId;
        this.createTime = new Date();
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}

