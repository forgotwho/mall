package org.webfunny.mall.service.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.webfunny.mall.service.entity.Tag;

public interface TagRepository extends CrudRepository<Tag, Long> {

	List<Tag> findByRecommend(Boolean recommend);
}
