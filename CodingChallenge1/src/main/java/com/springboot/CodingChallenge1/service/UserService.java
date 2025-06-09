package com.springboot.CodingChallenge1.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.CodingChallenge1.model.User;
import com.springboot.CodingChallenge1.repository.UserRepository;



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
		// Encode our plain password
		String encodePassword = passwordEncoder.encode(user.getPassword());
		
		// attach the encoded password in user
		user.setPassword(encodePassword);
		
		// save in DB
		return userRepository.save(user);
	}

}
