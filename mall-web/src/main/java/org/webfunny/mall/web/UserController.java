package org.webfunny.mall.web;

import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.bean.UserBean;
import org.webfunny.mall.service.entity.User;
import org.webfunny.mall.service.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public UserBean login(@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password,HttpServletRequest request,HttpServletResponse response) {
		UserBean result = null;
		User user = userRepository.findByUsernameAndPassword(username, password);
		if (user != null) {
			result = new UserBean(user.getId(),username);
			String uuid = UUID.randomUUID().toString();
			Cookie cookie = new Cookie("uid", uuid);
			cookie.setMaxAge(72000);
			cookie.setPath("/");
			response.addCookie(cookie);
			return result;
		}
		return result;
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public UserBean register(@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password) {
		UserBean result = null;
		User user = new User(username,password);
		user = userRepository.save(user);
		if (user != null && user.getId()!=null) {
			result = new UserBean(user.getId(),username);
		}
		return result;
	}
}
