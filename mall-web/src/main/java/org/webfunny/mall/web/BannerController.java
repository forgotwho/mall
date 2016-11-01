package org.webfunny.mall.web;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity.Banner;
import org.webfunny.mall.service.repository.BannerRepository;

@RestController
@RequestMapping("/banner")
public class BannerController {

    @Autowired
    private BannerRepository bannerRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<Banner> list() {
		List<Banner> bannerList = new ArrayList<Banner>();
		Iterable<Banner> it = bannerRepository.findAll();
		for(Iterator<Banner> iterator = it.iterator();iterator.hasNext();){
			bannerList.add(iterator.next());
		}
		return bannerList;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Banner get(@PathVariable Long id) {
		Banner banner = bannerRepository.findOne(id);
		return banner;
	}

	@RequestMapping(method = RequestMethod.POST)
	public boolean add(@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "link", required = false) String link,
			@RequestParam(value = "sortNum", required = false) Integer sortNum,
			@RequestParam(value = "showFlag", required = false) String showFlag) {
		Banner banner = new Banner(name, picture, memo, link, sortNum, showFlag);
		banner = bannerRepository.save(banner);
		if(banner!=null&&banner.getId()!=null){
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/{id}",method = RequestMethod.PUT)
	public boolean edit(@PathVariable Long id,
			@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "link", required = false) String link,
			@RequestParam(value = "sortNum", required = false) Integer sortNum,
			@RequestParam(value = "showFlag", required = false) String showFlag) {
		Banner banner = new Banner(id,name, picture, memo, link, sortNum, showFlag);
		banner = bannerRepository.save(banner);
		if(banner!=null&&banner.getId()!=id){
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
	public boolean delete(@PathVariable Long id) {
		bannerRepository.delete(id);
		return true;
	}
}
