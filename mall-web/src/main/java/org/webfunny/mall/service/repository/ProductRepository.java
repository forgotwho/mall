package org.webfunny.mall.service.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.webfunny.mall.service.entity.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

	List<Product> findByRecommend(String recommend);
}
