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
	
	@Column(length=102400) 
	private String imgData;//标签名称

	protected Img() {
	}
	
	/** 
	 * Creates a new instance of Img. 
	 * 
	 * @param imgData 
	 */ 
	public Img(String imgData) {
		super();
		this.imgData = imgData;
	}



	public Long getId() {
		return id;
	}

	public String getImgData() {
		return imgData;
	}
	
}
