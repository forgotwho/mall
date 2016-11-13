package org.webfunny.mall.service.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.webfunny.mall.service.entity.Banner;

public interface BannerRepository extends CrudRepository<Banner, Long> {

	List<Banner> findByRecommend(String recommend);
}
