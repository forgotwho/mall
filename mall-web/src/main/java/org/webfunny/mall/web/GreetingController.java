package org.webfunny.mall.web;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity.Customer;
import org.webfunny.mall.service.repository.CustomerRepository;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    
    @Autowired
    private CustomerRepository customerRepository;

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
    	Customer customer = new Customer("Rising","Sun");
    	customer = customerRepository.save(customer);
    	System.out.println(customer);
    	System.out.println(customerRepository.findAll());
    	return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }
}
