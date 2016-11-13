package org.webfunny.mall.service.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Banner {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;// 轮播名称
	private String picture;// 轮播图片
	private String memo;// 轮播描述
	private String link;// 轮播超链接
	private Boolean recommend;// 是否显示,true:显示,false:默认不显示
	private String source;// 来源,00-通用,01-PC,02-Mobile
	private String color;// 背景色
	private Integer sortNum;// 轮播排序

	protected Banner() {
	}

	public Banner(String name, String picture, String memo, String link, Boolean recommend, String source, String color,
			Integer sortNum) {
		super();
		this.name = name;
		this.picture = picture;
		this.memo = memo;
		this.link = link;
		this.recommend = recommend;
		this.source = source;
		this.color = color;
		this.sortNum = sortNum;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Boolean getRecommend() {
		return recommend;
	}

	public void setRecommend(Boolean recommend) {
		this.recommend = recommend;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public Integer getSortNum() {
		return sortNum;
	}

	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}
}
