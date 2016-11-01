package org.webfunny.mall.service.entity;

import javax.persistence.Entity;

@Entity
public class ProductTag {

	private Long productId;// 商品Id
	private Long tagId;// 标签Id

	protected ProductTag() {
	}

	public ProductTag(Long productId, Long tagId) {
		super();
		this.productId = productId;
		this.tagId = tagId;
	}

	public Long getProductId() {
		return productId;
	}

	public Long getTagId() {
		return tagId;
	}
}
