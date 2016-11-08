package org.webfunny.mall.web;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity.Tag;
import org.webfunny.mall.service.repository.TagRepository;

@RestController
@RequestMapping("/api/tag")
public class TagController {

	@Autowired
	private TagRepository tagRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<Tag> list(@RequestParam(value = "recommend", required = false) String recommend,HttpServletResponse response) {
		List<Tag> tagList = new ArrayList<Tag>();
		Iterable<Tag> it = tagRepository.findByRecommend(recommend);
		for(Iterator<Tag> iterator = it.iterator();iterator.hasNext();){
			tagList.add(iterator.next());
		}
		return tagList;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Tag get(@PathVariable Long id) {
		Tag tag = tagRepository.findOne(id);
		return tag;
	}

	@RequestMapping(method = RequestMethod.POST)
	public boolean add(@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "recommend", required = false,defaultValue="0") String recommend,
			@RequestParam(value = "sortNum", required = false,defaultValue="10") Integer sortNum,
			@RequestParam(value = "parentId", required = false) Long parentId) {
		Tag tag = new Tag(name, picture, memo, recommend, sortNum);
		tag = tagRepository.save(tag);
		if(tag!=null&&tag.getId()!=null){
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/{id}",method = RequestMethod.PUT)
	public boolean edit(@PathVariable Long id,@RequestParam(value = "name", required = true) String name,
			@RequestParam(value = "picture", required = false) String picture,
			@RequestParam(value = "memo", required = false) String memo,
			@RequestParam(value = "recommend", required = false) String recommend,
			@RequestParam(value = "sortNum", required = false) Integer sortNum,
			@RequestParam(value = "parentId", required = false) Long parentId) {
		Tag tag = new Tag(id,name, picture, parentId);
		tag = tagRepository.save(tag);
		if(tag!=null&&tag.getId()!=id){
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
	public boolean delete(@PathVariable Long id) {
		tagRepository.delete(id);
		return true;
	}
}
