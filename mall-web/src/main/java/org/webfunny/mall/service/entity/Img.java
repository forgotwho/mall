package org.webfunny.mall.service.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Img {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String uid;
	private String name;
	private String type;
	private String status;
	private String size;
	@Column(length=102400) 
	private String thumbUrl;

	protected Img() {
	}
	
	public Img(String uid, String name, String type, String status, String size, String thumbUrl) {
		super();
		this.uid = uid;
		this.name = name;
		this.type = type;
		this.status = status;
		this.size = size;
		this.thumbUrl = thumbUrl;
	}

	public Long getId() {
		return id;
	}

	public String getUid() {
		return uid;
	}

	public String getName() {
		return name;
	}

	public String getType() {
		return type;
	}

	public String getStatus() {
		return status;
	}

	public String getSize() {
		return size;
	}

	public String getThumbUrl() {
		return thumbUrl;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public void setThumbUrl(String thumbUrl) {
		this.thumbUrl = thumbUrl;
	}
}
