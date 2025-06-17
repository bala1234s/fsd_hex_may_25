package com.springboot.vehicleInsurance.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.User;
import com.springboot.vehicleInsurance.service.UserService;
import com.springboot.vehicleInsurance.util.JwtUtil;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:5173")
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
	 */

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
	 */

	@GetMapping("/get-token")
	public ResponseEntity<?> getToken(Principal principal) {
		try {

			String token = jwtUtil.createToken(principal.getName()); // Use email/username directly

			Map<String, String> map = new HashMap<>();
			map.put("token", token);
			return ResponseEntity.status(HttpStatus.OK).body(map);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}

	}

	/*
	 * Aim : Get the user details by token
	 * path : api/user/details
	 * Method : GET
	 * Response : Object
	 * Input : token
	 */

	@GetMapping("/details")
	public Object getUserDetails(Principal principal) {
		String username = principal.getName();
		return userService.getUserDetails(username);
	}
}
