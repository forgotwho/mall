package org.webfunny.mall.service.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String type;
	private String picture;
	private String memo;
	private String state;
	private Date createTime;
	private Date updateTime;

	protected Product() {
	}

	public Product(String name, String type, String picture, String memo, String state) {
		this.name = name;
		this.type = type;
		this.picture = picture;
		this.memo = memo;
		this.state = state;
		this.createTime = new Date();
        this.updateTime = new Date();
	}

	@Override
	public String toString() {
		return String.format("Advertisement[id=%d, name='%s', type='%s', picture='%s', memo='%s', state='%s']", 
				id, name, type, picture, memo, state);
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getType() {
		return type;
	}

	public String getPicture() {
		return picture;
	}

	public String getMemo() {
		return memo;
	}
	
	public String getState() {
		return state;
	}
	
	public Date getCreateTime() {
		return createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}
}
