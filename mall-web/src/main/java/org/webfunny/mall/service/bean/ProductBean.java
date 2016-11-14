package org.webfunny.mall.service.bean;

import java.util.List;

import org.webfunny.mall.service.entity.Product;
import org.webfunny.mall.service.entity.Tag;

public class ProductBean {

	private Tag tag;
	private List<Product> productList;
	public Tag getTag() {
		return tag;
	}
	public void setTag(Tag tag) {
		this.tag = tag;
	}
	public List<Product> getProductList() {
		return productList;
	}
	public void setProductList(List<Product> productList) {
		this.productList = productList;
	}
}
