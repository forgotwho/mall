package org.webfunny.mall.service.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;//商品名称
	private String memo;//商品简介
	private String detail;//商品详情
	private String picture;//商品主图
	private Integer sortNum;//商品排序

	protected Product() {
	}
	
	public Product(String name, String memo, String detail, String picture, Integer sortNum) {
		super();
		this.name = name;
		this.memo = memo;
		this.detail = detail;
		this.picture = picture;
		this.sortNum = sortNum;
	}

	public Product(Long id,String name, String memo, String detail, String picture, Integer sortNum) {
		super();
		this.id = id;
		this.name = name;
		this.memo = memo;
		this.detail = detail;
		this.picture = picture;
		this.sortNum = sortNum;
	}


	@Override
	public String toString() {
		return String.format("Advertisement[id=%d, name='%s', picture='%s', memo='%s']", 
				id, name, picture, memo);
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getPicture() {
		return picture;
	}

	public String getMemo() {
		return memo;
	}


	public String getDetail() {
		return detail;
	}


	public Integer getSortNum() {
		return sortNum;
	}
	
}
