package org.webfunny.mall.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity.Product;
import org.webfunny.mall.service.repository.ProductRepository;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @RequestMapping("")
    public Object list() {
    	Iterable<Product> list = productRepository.findAll();
    	return list;
    }
}
