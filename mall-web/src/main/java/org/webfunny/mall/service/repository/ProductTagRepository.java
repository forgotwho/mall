package org.webfunny.mall.service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.webfunny.mall.service.entity.Product;
import org.webfunny.mall.service.entity.ProductTag;

public interface ProductTagRepository extends CrudRepository<ProductTag, Long> {
	
	List<ProductTag> findByTagId(Long tagId);
	
	List<ProductTag> findByProductId(Long productId);
	
	void deleteByProductId(Long productId);
	
	@Query("select p from Product p,ProductTag r where p.id = r.productId and r.tagId =:tagId")  
	public List<Product> findByTag(@Param("tagId") Long tagId);
	
	@Query("select p from Product p,ProductTag r where p.id = r.productId and r.tagId =:tagId and p.recommend = :recommend")  
	public List<Product> findByTag(@Param("recommend") Boolean recommend,@Param("tagId") Long tagId);
	
	@Query("select p from Product p where p.recommend = :recommend and p.name like :name")  
	public List<Product> findByName(@Param("recommend") Boolean recommend,@Param("name") String name);

}
