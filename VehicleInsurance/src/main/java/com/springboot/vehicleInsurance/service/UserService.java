package com.springboot.vehicleInsurance.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.model.User;
import com.springboot.vehicleInsurance.repository.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	
	

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}


	public User signUp(User user) {
		// User raw password
		String plainPassword = user.getPassword();
		
		// Password encoder
		String encodedPassword = passwordEncoder.encode(plainPassword);
		
		// Set encode password to User
		user.setPassword(encodedPassword);
		// save in DB
		return userRepository.save(user);
	}

}
