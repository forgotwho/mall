package org.webfunny.mall.service.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Advertisement {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String postion;
	private String picture;
	private String memo;
	private String link;
	private String state;
	private Integer width;
	private Integer height;
	private Date createTime;
	private Date updateTime;

	protected Advertisement() {
	}

	public Advertisement(String name, String postion, String picture, String memo, String link, String state) {
		this.name = name;
		this.postion = postion;
		this.picture = picture;
		this.memo = memo;
		this.link = link;
		this.state = state;
		this.createTime = new Date();
        this.updateTime = new Date();
	}

	@Override
	public String toString() {
		return String.format("Advertisement[id=%d, name='%s', postion='%s', picture='%s', memo='%s',link='%s', state='%s']", 
				id, name, postion, picture, memo, link, state);
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getPostion() {
		return postion;
	}

	public String getPicture() {
		return picture;
	}

	public String getMemo() {
		return memo;
	}
	
	public String getLink() {
		return link;
	}
	
	public String getState() {
		return state;
	}

	public Integer getWidth() {
		return width;
	}

	public Integer getHeight() {
		return height;
	}
	
	public Date getCreateTime() {
		return createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}
}
