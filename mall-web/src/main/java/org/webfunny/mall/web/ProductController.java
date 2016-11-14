package org.webfunny.mall.web;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity.Product;
import org.webfunny.mall.service.entity.ProductTag;
import org.webfunny.mall.service.repository.ProductRepository;
import org.webfunny.mall.service.repository.ProductTagRepository;

@RestController
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductTagRepository productTagRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<Product> list(@RequestParam(value = "tagId", required = false) Long tagId,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "recommend", required = false) Boolean recommend) {
		List<Product> productList = new ArrayList<Product>();
		Iterable<Product> it = null;
		if (StringUtils.isEmpty(recommend)) {
			it = productRepository.findAll();
			for (Iterator<Product> iterator = it.iterator(); iterator.hasNext();) {
				productList.add(iterator.next());
			}
		} else {
			if(!StringUtils.isEmpty(name)){
				productList = productTagRepository.findByName(recommend, name);
			}else if(!StringUtils.isEmpty(tagId)){
				productList = productTagRepository.findByTag(recommend, tagId);
			}else{
				productList = productRepository.findByRecommend(recommend);
			}
		}
		return productList;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Product get(@PathVariable Long id) {
		Product product = productRepository.findOne(id);
		List<ProductTag> productTagList = productTagRepository.findByProductId(id);
		String tagIds = "";
		if(productTagList!=null&&!productTagList.isEmpty()){
			for(ProductTag productTag: productTagList){
				if(tagIds.equals("")){
					tagIds = String.valueOf(productTag.getTagId());
				}else{
					tagIds =tagIds+"," + String.valueOf(productTag.getTagId());
				}
			}
		}
		product.setTagIds(tagIds);
		return product;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	public boolean add(@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "detail", required = false) String detail,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "pictureSet", required = false) String pictureSet,
			@RequestParam(value = "colors", required = false) String colors,
			@RequestParam(value = "diameter", required = false) String diameter,
			@RequestParam(value = "baseCurve", required = false) String baseCurve,
			@RequestParam(value = "waterContent", required = false) String waterContent,
			@RequestParam(value = "originPlace", required = false) String originPlace,
			@RequestParam(value = "wearCycle", required = false) String wearCycle,
			@RequestParam(value = "sortNum", required = false) Integer sortNum,
			@RequestParam(value = "recommend", required = false, defaultValue = "false") Boolean recommend,
			@RequestParam(value = "tagIds", required = false) String tagIds) {

		Product product = new Product(name, detail, picture, pictureSet, sortNum, colors, diameter, baseCurve,
				waterContent, originPlace, wearCycle,recommend);
		product.setTagIds(tagIds);
		product = productRepository.save(product);
		if (product != null && product.getId() != null) {
			List<ProductTag> productTagList = new ArrayList<ProductTag>();
			if (tagIds != null) {
				for (String tagId : tagIds.split(",")) {
					ProductTag productTag = new ProductTag(product.getId(), Long.parseLong(tagId));
					productTagList.add(productTag);
				}
				productTagRepository.save(productTagList);
				return true;
			}
		}
		return false;
	}

	@RequestMapping(value = "edit/{id}", method = RequestMethod.POST)
	public boolean edit(@PathVariable Long id, @RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "detail", required = false) String detail,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "pictureSet", required = false) String pictureSet,
			@RequestParam(value = "colors", required = false) String colors,
			@RequestParam(value = "diameter", required = false) String diameter,
			@RequestParam(value = "baseCurve", required = false) String baseCurve,
			@RequestParam(value = "waterContent", required = false) String waterContent,
			@RequestParam(value = "originPlace", required = false) String originPlace,
			@RequestParam(value = "wearCycle", required = false) String wearCycle,
			@RequestParam(value = "sortNum", required = false) Integer sortNum,
			@RequestParam(value = "recommend", required = false, defaultValue = "false") Boolean recommend,
			@RequestParam(value = "tagIds", required = false) String tagIds) {
		Product product = new Product(name, detail, picture, pictureSet, sortNum, colors, diameter, baseCurve,
				waterContent, originPlace, wearCycle,recommend);
		product.setId(id);
		product.setTagIds(tagIds);
		product = productRepository.save(product);
		if (product != null && product.getId() == id) {
			List<ProductTag> productTagList = new ArrayList<ProductTag>();
			List<ProductTag> tagList = productTagRepository.findByProductId(id);
			productTagRepository.delete(tagList);
			if (tagIds != null) {
				for (String tagId : tagIds.split(",")) {
					ProductTag productTag = new ProductTag(product.getId(), Long.parseLong(tagId));
					productTagList.add(productTag);
				}
				productTagRepository.save(productTagList);
				return true;
			}
		}
		return false;
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.POST)
	public boolean delete(@PathVariable Long id) {
		productRepository.delete(id);
		return true;
	}
}
