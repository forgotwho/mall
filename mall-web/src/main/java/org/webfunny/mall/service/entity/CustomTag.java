package org.webfunny.mall.service.entity;

import javax.persistence.Entity;
<<<<<<< HEAD
=======
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
>>>>>>> 1dd2ba724031f690f9885f3de97ce6f249e07ce9

@Entity
public class CustomTag {

<<<<<<< HEAD
=======
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
>>>>>>> 1dd2ba724031f690f9885f3de97ce6f249e07ce9
	private Long tagId;//标签Id
	private Integer sortNum;//显示顺序

	protected CustomTag() {
	}

	public CustomTag(Long tagId, Integer sortNum) {
		super();
		this.tagId = tagId;
		this.sortNum = sortNum;
	}
<<<<<<< HEAD
=======
	
	public Long getId() {
		return id;
	}
>>>>>>> 1dd2ba724031f690f9885f3de97ce6f249e07ce9

	public Long getTagId() {
		return tagId;
	}

	public Integer getSortNum() {
		return sortNum;
	}
	
}
