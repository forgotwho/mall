package org.webfunny.mall.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity.Advertisement;
import org.webfunny.mall.service.repository.AdvertisementRepository;

@RestController
@RequestMapping("/advertisement")
public class AdvertisementController {

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @RequestMapping("")
    public Object list() {
    	Iterable<Advertisement> list = advertisementRepository.findAll();
    	return list;
    }
}
