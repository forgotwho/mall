package org.webfunny.mall.service.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;// 商品名称
	@Column(length=102400) 
	private String detail;// 商品详情
	private String picture;// 商品主图
	private String pictureSet;// 商品缩略图
	private Integer sortNum;// 商品排序
	private String colors;// 可选颜色
	private String diameter;// 直径
	private String baseCurve;// 基弧
	private String waterContent;// 含水量
	private String originPlace;// 产地
	private String wearCycle;// 佩戴周期
	private Boolean recommend;// 是否推荐 true:推荐,false:默认
	private String tagIds;

	protected Product() {
	}

	public Product(String name, String detail, String picture, String pictureSet, Integer sortNum, String colors,
			String diameter, String baseCurve, String waterContent, String originPlace, String wearCycle,
			Boolean recommend) {
		super();
		this.name = name;
		this.detail = detail;
		this.picture = picture;
		this.pictureSet = pictureSet;
		this.sortNum = sortNum;
		this.colors = colors;
		this.diameter = diameter;
		this.baseCurve = baseCurve;
		this.waterContent = waterContent;
		this.originPlace = originPlace;
		this.wearCycle = wearCycle;
		this.recommend = recommend;
	}

	@Override
	public String toString() {
		return String.format("Advertisement[id=%d, name='%s', picture='%s']", id, name, picture);
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

	public String getDetail() {
		return detail;
	}

	public String getPicture() {
		return picture;
	}

	public String getPictureSet() {
		return pictureSet;
	}

	public Integer getSortNum() {
		return sortNum;
	}

	public String getColors() {
		return colors;
	}

	public String getDiameter() {
		return diameter;
	}

	public String getBaseCurve() {
		return baseCurve;
	}

	public String getWaterContent() {
		return waterContent;
	}

	public String getOriginPlace() {
		return originPlace;
	}

	public String getWearCycle() {
		return wearCycle;
	}

	public Boolean getRecommend() {
		return recommend;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public void setPictureSet(String pictureSet) {
		this.pictureSet = pictureSet;
	}

	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}

	public void setColors(String colors) {
		this.colors = colors;
	}

	public void setDiameter(String diameter) {
		this.diameter = diameter;
	}

	public void setBaseCurve(String baseCurve) {
		this.baseCurve = baseCurve;
	}

	public void setWaterContent(String waterContent) {
		this.waterContent = waterContent;
	}

	public void setOriginPlace(String originPlace) {
		this.originPlace = originPlace;
	}

	public void setWearCycle(String wearCycle) {
		this.wearCycle = wearCycle;
	}

	public void setRecommend(Boolean recommend) {
		this.recommend = recommend;
	}

	public String getTagIds() {
		return tagIds;
	}

	public void setTagIds(String tagIds) {
		this.tagIds = tagIds;
	}
}
