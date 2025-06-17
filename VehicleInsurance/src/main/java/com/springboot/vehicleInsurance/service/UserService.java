package com.springboot.vehicleInsurance.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.model.Officer;
import com.springboot.vehicleInsurance.model.User;
import com.springboot.vehicleInsurance.repository.CustomerRepository;
import com.springboot.vehicleInsurance.repository.OfficerRepository;
import com.springboot.vehicleInsurance.repository.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private CustomerRepository customerRepository;
	private OfficerRepository officerRepository;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			CustomerRepository customerRepository, OfficerRepository officerRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.customerRepository = customerRepository;
		this.officerRepository = officerRepository;
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

	public Object getUserDetails(String username) {
		User user = userRepository.getUserByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("Username Not Found");
		}
		switch (user.getRole().toUpperCase()) {
			case "CUSTOMER":
				Customer customer = customerRepository.getByUsername(username);
				return customer;
			case "OFFICER":
				Officer officer = officerRepository.getOfficerByUsername(username);
				return officer;
			default:
				return null;
		}

	}

}
