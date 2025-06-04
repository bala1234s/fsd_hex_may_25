package com.springboot.vehicleInsurance.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.User;
import com.springboot.vehicleInsurance.service.UserService;
import com.springboot.vehicleInsurance.util.JwtUtil;

@RestController
@RequestMapping("api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
    /*
     * Aim : To add new user as signUp
     * path : api/user/signup
     * Method : Post
     * Response : User
     * Input : new User
     * */
	
	@PostMapping("/signup")
	public User signUp(@RequestBody User user) {
		return userService.signUp(user);
	}
	
	/*
	 * Aim : Get the Token by Username
	 * path : api/user/get-token
	 * Method : GET
	 * Response : String
	 * Input : username
	 * 
	 * */
	
	@GetMapping("/get-token")
	public String getToken(Principal principal) {
	    try {
	        return jwtUtil.createToken(principal.getName()); // Use email/username directly
	    } catch(Exception e) {
	        return e.getMessage();
	    }
	}

}
