package org.webfunny.mall.service.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Tag {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;//标签名称
	private String picture;//标签图标
	private Long parentId;//父标签Id

	protected Tag() {
	}

	public Tag(String name, String picture, Long parentId) {
		super();
		this.name = name;
		this.picture = picture;
		this.parentId = parentId;
	}

	public Tag(Long id, String name, String picture, Long parentId) {
		super();
		this.id = id;
		this.name = name;
		this.picture = picture;
		this.parentId = parentId;
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

	public Long getParentId() {
		return parentId;
	}
}
