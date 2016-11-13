package org.webfunny.mall.service.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.webfunny.mall.service.entity.ProductTag;

public interface ProductTagRepository extends CrudRepository<ProductTag, Long> {
	
	List<ProductTag> findByTagId(Long tagId);
	
	List<ProductTag> findByProductId(Long productId);
	
	void deleteByProductId(Long productId);

}
