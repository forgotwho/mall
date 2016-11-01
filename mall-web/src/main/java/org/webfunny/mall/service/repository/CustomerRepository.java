package org.webfunny.mall.service.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.webfunny.mall.service.entity.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    List<Customer> findByLastName(String lastName);
}
