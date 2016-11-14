package org.webfunny.mall.web;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.bean.ProductBean;
import org.webfunny.mall.service.entity.Product;
import org.webfunny.mall.service.entity.Tag;
import org.webfunny.mall.service.repository.ProductTagRepository;
import org.webfunny.mall.service.repository.TagRepository;

@RestController
@RequestMapping("/api/tag")
public class TagController {

	@Autowired
	private TagRepository tagRepository;
	
	@Autowired
	private ProductTagRepository productTagRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<Tag> list(@RequestParam(value = "recommend", required = false) Boolean recommend,
			HttpServletResponse response) {
		List<Tag> tagList = new ArrayList<Tag>();
		Iterable<Tag> it = null;
		if (StringUtils.isEmpty(recommend)) {
			it = tagRepository.findAll();
		} else {
			it = tagRepository.findByRecommend(recommend);
		}
		for (Iterator<Tag> iterator = it.iterator(); iterator.hasNext();) {
			tagList.add(iterator.next());
		}
		return tagList;
	}
	
	@RequestMapping(value = "product", method = RequestMethod.GET)
	public List<ProductBean> product(@RequestParam(value = "recommend", required = false) Boolean recommend,
			HttpServletResponse response) {
		List<ProductBean> productBeanList = new ArrayList<ProductBean>();
		Iterable<Tag> it = null;
		if (StringUtils.isEmpty(recommend)) {
			it = tagRepository.findAll();
		} else {
			it = tagRepository.findByRecommend(recommend);
		}
		for (Iterator<Tag> iterator = it.iterator(); iterator.hasNext();) {
			ProductBean productBean = new ProductBean();
			Tag tag = iterator.next();
			List<Product> productList = productTagRepository.findByTag(tag.getId());
			productBean.setTag(tag);
			productBean.setProductList(productList);
			productBeanList.add(productBean);
		}
		return productBeanList;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Tag get(@PathVariable Long id) {
		Tag tag = tagRepository.findOne(id);
		return tag;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	public boolean add(@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "color", required = false) String color,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "recommend", required = false, defaultValue = "false") Boolean recommend,
			@RequestParam(value = "sortNum", required = false, defaultValue = "10") Integer sortNum) {
		Tag tag = new Tag(name, picture,color, memo, recommend, sortNum);
		tag = tagRepository.save(tag);
		if (tag != null && tag.getId() != null) {
			return true;
		}
		return false;
	}

	@RequestMapping(value = "edit/{id}", method = RequestMethod.POST)
	public boolean edit(@PathVariable Long id, @RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "color", required = false) String color,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "recommend", required = false) Boolean recommend,
			@RequestParam(value = "sortNum", required = false) Integer sortNum) {
		Tag tag = new Tag(name, picture,color, memo, recommend, sortNum);
		tag.setId(id);
		tag = tagRepository.save(tag);
		if (tag != null && tag.getId() == id) {
			return true;
		}
		return false;
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.POST)
	public boolean delete(@PathVariable Long id) {
		tagRepository.delete(id);
		return true;
	}
}
