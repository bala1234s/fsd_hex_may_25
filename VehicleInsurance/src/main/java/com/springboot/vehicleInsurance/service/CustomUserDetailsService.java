package com.springboot.vehicleInsurance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.model.User;
import com.springboot.vehicleInsurance.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		// Fetch User by username
		User user = userRepository.getUserByUsername(username);
		
		if(user == null)
			throw new UsernameNotFoundException("Invalid Credentials");
		// Convert the Role as Spring Authority
		SimpleGrantedAuthority sga = new SimpleGrantedAuthority(user.getRole());
		
		
		// Our User convert to spring security User that is UserDetails
		org.springframework.security.core.userdetails.User springUser =
				new org.springframework.security.core.userdetails.User(
															user.getUsername(),
															user.getPassword(), 
															List.of(sga)); // List of users
		 
		return springUser;
	}
	
}
