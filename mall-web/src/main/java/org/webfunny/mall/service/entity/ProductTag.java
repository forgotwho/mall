package org.webfunny.mall.service.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductTag {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long productId;// 商品Id
	private Long tagId;// 标签Id

	protected ProductTag() {
	}

	public ProductTag(Long productId, Long tagId) {
		super();
		this.productId = productId;
		this.tagId = tagId;
	}
	
	public Long getId() {
		return id;
	}

	public Long getProductId() {
		return productId;
	}

	public Long getTagId() {
		return tagId;
	}
}
