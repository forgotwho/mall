package org.webfunny.mall.service.entity;

import javax.persistence.Entity;
<<<<<<< HEAD
=======
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
>>>>>>> 1dd2ba724031f690f9885f3de97ce6f249e07ce9

@Entity
public class ProductTag {

<<<<<<< HEAD
=======
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
>>>>>>> 1dd2ba724031f690f9885f3de97ce6f249e07ce9
	private Long productId;// 商品Id
	private Long tagId;// 标签Id

	protected ProductTag() {
	}

	public ProductTag(Long productId, Long tagId) {
		super();
		this.productId = productId;
		this.tagId = tagId;
	}
<<<<<<< HEAD
=======
	
	public Long getId() {
		return id;
	}
>>>>>>> 1dd2ba724031f690f9885f3de97ce6f249e07ce9

	public Long getProductId() {
		return productId;
	}

	public Long getTagId() {
		return tagId;
	}
}
