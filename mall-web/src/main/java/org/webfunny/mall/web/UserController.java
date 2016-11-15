package org.webfunny.mall.web;

import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webfunny.mall.service.entity.User;
import org.webfunny.mall.service.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password) {
		password = MD5Encoder.encode(password.getBytes());
		User user = userRepository.findByUsernameAndPassword(username, password);
		if (user != null) {
			return user.getUsername();
		}
		return null;
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public String register(@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password) {
		User user = new User(username,MD5Encoder.encode(password.getBytes()));
		user = userRepository.save(user);
		if (user != null && user.getId()!=null) {
			return user.getUsername();
		}
		return null;
	}
}
