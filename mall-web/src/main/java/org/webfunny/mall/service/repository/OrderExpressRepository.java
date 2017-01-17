package org.webfunny.mall.service.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.webfunny.mall.service.entity.OrderExpress;

public interface OrderExpressRepository extends CrudRepository<OrderExpress, Long> {

	List<OrderExpress> findByOrderId(String orderId);
	
	Page<OrderExpress> findAll(Pageable pageable);
}
