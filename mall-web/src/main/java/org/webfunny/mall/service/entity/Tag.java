package org.webfunny.mall.service.entity;

import javax.persistence.Column;
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
	@Column(length=102400)
	private String picture;//标签图标
	private String memo;//标签图标
	private String recommend ;//是否推荐 1:推荐,0:默认
	private Integer sortNum;//排序顺序
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
	
	/** 
	 * Creates a new instance of Tag. 
	 * 
	 * @param name
	 * @param picture
	 * @param memo
	 * @param recommend
	 * @param sortNum 
	 */ 
	public Tag(String name, String picture, String memo, String recommend, Integer sortNum) {
		super();
		this.name = name;
		this.picture = picture;
		this.memo = memo;
		this.recommend = recommend;
		this.sortNum = sortNum;
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

	public String getMemo() {
		return memo;
	}

	public String getRecommend() {
		return recommend;
	}

	public Integer getSortNum() {
		return sortNum;
	}
}
