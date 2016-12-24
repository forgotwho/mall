package org.webfunny.mall.service.repository;

import org.springframework.data.repository.CrudRepository;
import org.webfunny.mall.service.entity.OrderExpress;

public interface OrderExpressRepository extends CrudRepository<OrderExpress, Long> {

	OrderExpress findByOrderId(String orderId);
}
