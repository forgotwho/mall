package org.webfunny.mall.web;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity.CustomTag;
import org.webfunny.mall.service.repository.CustomTagRepository;

@RestController
@RequestMapping("/customtag")
public class CustomTagController {

	@Autowired
	private CustomTagRepository customTagRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<CustomTag> list() {
		List<CustomTag> customTagList = new ArrayList<CustomTag>();
		Iterable<CustomTag> it = customTagRepository.findAll();
		for(Iterator<CustomTag> iterator = it.iterator();iterator.hasNext();){
			customTagList.add(iterator.next());
		}
		return customTagList;
	}

	@RequestMapping(method = RequestMethod.POST)
	public boolean add(@RequestParam(value = "tagIds", required = true) Long [] tagIds) {
		List<CustomTag> list = new ArrayList<CustomTag>();
		for(int i=0;i<tagIds.length;i++){
			CustomTag customTag = new CustomTag(tagIds[i],i);
			list.add(customTag);
		}
		customTagRepository.deleteAll();
		Iterable<CustomTag> it =customTagRepository.save(list);
		if(it!=null){
			return true;
		}
		return false;
	}
}
