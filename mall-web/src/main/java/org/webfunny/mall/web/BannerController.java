package org.webfunny.mall.web;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity.Banner;
import org.webfunny.mall.service.repository.BannerRepository;

@RestController
@RequestMapping("/api/banner")
public class BannerController {

	@Autowired
	private BannerRepository bannerRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<Banner> list(@RequestParam(value = "recommend", required = false) String recommend,
			HttpServletResponse response) {
		List<Banner> bannerList = new ArrayList<Banner>();
		Iterable<Banner> it = null;
		if (StringUtils.isEmpty(recommend)) {
			it = bannerRepository.findAll();
		} else {
			it = bannerRepository.findByRecommend(recommend);
		}
		for (Iterator<Banner> iterator = it.iterator(); iterator.hasNext();) {
			bannerList.add(iterator.next());
		}
		return bannerList;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Banner get(@PathVariable Long id) {
		Banner banner = bannerRepository.findOne(id);
		return banner;
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	public boolean add(@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "link", required = false) String link,
			@RequestParam(value = "recommend", required = false, defaultValue = "false") Boolean recommend,
			@RequestParam(value = "source", required = false) String source,
			@RequestParam(value = "color", required = false) String color,
			@RequestParam(value = "sortNum", required = false, defaultValue = "10") Integer sortNum) {
		Banner banner = new Banner(name, picture, memo, link, recommend, source, color, sortNum);
		banner = bannerRepository.save(banner);
		if (banner != null && banner.getId() != null) {
			return true;
		}
		return false;
	}

	@RequestMapping(value = "edit/{id}", method = RequestMethod.POST)
	public boolean edit(@PathVariable Long id, @RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "link", required = false) String link,
			@RequestParam(value = "recommend", required = false) Boolean recommend,
			@RequestParam(value = "source", required = false) String source,
			@RequestParam(value = "color", required = false) String color,
			@RequestParam(value = "sortNum", required = false) Integer sortNum) {
		Banner banner = new Banner(name, picture, memo, link, recommend, source, color, sortNum);
		banner.setId(id);
		banner = bannerRepository.save(banner);
		if (banner != null && banner.getId() == id) {
			return true;
		}
		return false;
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.POST)
	public boolean delete(@PathVariable Long id) {
		bannerRepository.delete(id);
		return true;
	}
}
