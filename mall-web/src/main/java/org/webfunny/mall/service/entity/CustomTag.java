package org.webfunny.mall.service.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CustomTag {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long tagId;//标签Id
	private Integer sortNum;//显示顺序

	protected CustomTag() {
	}

	public CustomTag(Long tagId, Integer sortNum) {
		super();
		this.tagId = tagId;
		this.sortNum = sortNum;
	}
	
	public Long getId() {
		return id;
	}

	public Long getTagId() {
		return tagId;
	}

	public Integer getSortNum() {
		return sortNum;
	}
	
}
