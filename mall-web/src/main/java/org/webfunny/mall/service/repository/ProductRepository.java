package org.webfunny.mall.service.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.webfunny.mall.service.entity.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

	List<Product> findByRecommend(Boolean recommend);
	
	List<Product> findByRecommendAndName(Boolean recommend,String name);
}
