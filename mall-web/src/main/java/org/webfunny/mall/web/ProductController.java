package org.webfunny.mall.web;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity. Product;
import org.webfunny.mall.service.entity.ProductTag;
import org.webfunny.mall.service.repository.ProductRepository;
import org.webfunny.mall.service.repository.ProductTagRepository;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
	private  ProductRepository  productRepository;
    
    @Autowired
	private  ProductTagRepository  productTagRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List< Product> list() {
		List< Product>  productList = new ArrayList< Product>();
		Iterable< Product> it =  productRepository.findAll();
		for(Iterator< Product> iterator = it.iterator();iterator.hasNext();){
			 productList.add(iterator.next());
		}
		return  productList;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public  Product get(@PathVariable Long id) {
		 Product  product =  productRepository.findOne(id);
		return  product;
	}

	@RequestMapping(method = RequestMethod.POST)
	public boolean add(@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "detail", required = false) String detail,
			@RequestParam(value = "sortNum", required = false) Integer sortNum,
			@RequestParam(value = "tagIds", required = false) Long [] tagIds) {
		
		 Product  product = new Product(name, memo, detail, picture, sortNum);
		 product =  productRepository.save( product);
		if( product!=null&& product.getId()!=null){
			List<ProductTag> productTagList = new ArrayList<ProductTag>();
			for(Long tagId:tagIds){
				ProductTag productTag = new ProductTag(product.getId(),tagId);
				productTagList.add(productTag);
			}
			productTagRepository.save(productTagList);
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/{id}",method = RequestMethod.PUT)
	public boolean edit(@PathVariable Long id,@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "detail", required = false) String detail,
			@RequestParam(value = "sortNum", required = false) Integer sortNum,
			@RequestParam(value = "tagIds", required = false) Long [] tagIds) {
		 Product  product = new  Product(id,name, memo, detail, picture, sortNum);
		 product =  productRepository.save( product);
		if(product!=null&& product.getId()!=id){
			productTagRepository.deleteAll();
			List<ProductTag> productTagList = new ArrayList<ProductTag>();
			for(Long tagId:tagIds){
				ProductTag productTag = new ProductTag(product.getId(),tagId);
				productTagList.add(productTag);
			}
			productTagRepository.save(productTagList);
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
	public boolean delete(@PathVariable Long id) {
		 productRepository.delete(id);
		return true;
	}
}
