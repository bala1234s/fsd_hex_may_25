package com.springboot.CodingChallenge1.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.CodingChallenge1.model.User;
import com.springboot.CodingChallenge1.service.UserService;
import com.springboot.CodingChallenge1.util.JwtUtil;



@RestController
@RequestMapping("api/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	/*
	 * Aim : TO insert the User Details
	 * Path : api/user/signup
	 * Method : Post
	 * Input : User
	 * Response : User
	 * 
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
