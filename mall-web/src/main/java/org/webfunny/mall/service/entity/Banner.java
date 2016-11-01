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
	private String name;//轮播名称
	private String picture;//轮播图片
	private String memo;//轮播描述
	private String link;//轮播超链接
	private Integer sortNum;//轮播排序
	private String showFlag;//是否展示

	protected Banner() {
	}

	public Banner(String name, String picture, String memo, String link) {
		this.name = name;
		this.picture = picture;
		this.memo = memo;
		this.link = link;
	}

	public Banner(String name, String picture, String memo, String link, Integer sortNum, String showFlag) {
		super();
		this.name = name;
		this.picture = picture;
		this.memo = memo;
		this.link = link;
		this.sortNum = sortNum;
		this.showFlag = showFlag;
	}
	
	public Banner(Long id,String name, String picture, String memo, String link, Integer sortNum, String showFlag) {
		super();
		this.id = id;
		this.name = name;
		this.picture = picture;
		this.memo = memo;
		this.link = link;
		this.sortNum = sortNum;
		this.showFlag = showFlag;
	}

	@Override
	public String toString() {
		return String.format("Advertisement[id=%d, name='%s', picture='%s', memo='%s',link='%s']", 
				id, name, picture, memo, link);
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

	public String getMemo() {
		return memo;
	}
	
	public String getLink() {
		return link;
	}

	public Integer getSortNum() {
		return sortNum;
	}

	public String getShowFlag() {
		return showFlag;
	}
	
}
