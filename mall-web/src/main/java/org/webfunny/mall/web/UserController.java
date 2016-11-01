package org.webfunny.mall.web;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.bean.UserBean;
import org.webfunny.mall.service.entity.User;
import org.webfunny.mall.service.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/login")
    public UserBean login(@RequestParam(value="username") String username,@RequestParam(value="password") String password) {
    	User user = userRepository.findByUsernameAndPasswordAndState(username, password, "1");
    	UserBean userBean = new UserBean();
    	//BeanUtils.copyProperties(user, userBean);
    	return userBean;
    }
    
    @RequestMapping("/add")
    public UserBean add(@RequestParam(value="username") String username,@RequestParam(value="password") String password) {
    	User user = new User(username,password); 
    	user = userRepository.save(user);
    	UserBean userBean = new UserBean();
    	BeanUtils.copyProperties(user, userBean);
    	return userBean;
    }
}
