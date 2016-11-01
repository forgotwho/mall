package org.webfunny.mall.service.entity;

import javax.persistence.Entity;

@Entity
public class CustomTag {

	private Long tagId;//标签Id
	private Integer sortNum;//显示顺序

	protected CustomTag() {
	}

	public CustomTag(Long tagId, Integer sortNum) {
		super();
		this.tagId = tagId;
		this.sortNum = sortNum;
	}

	public Long getTagId() {
		return tagId;
	}

	public Integer getSortNum() {
		return sortNum;
	}
	
}
