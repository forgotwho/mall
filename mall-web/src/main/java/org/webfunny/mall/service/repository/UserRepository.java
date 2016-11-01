package org.webfunny.mall.service.repository;

import org.springframework.data.repository.CrudRepository;
import org.webfunny.mall.service.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {

	User findByUsernameAndPassword(String username,String password);
}
