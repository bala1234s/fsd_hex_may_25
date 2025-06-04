package com.springboot.vehicleInsurance.service;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.model.Officer;
import com.springboot.vehicleInsurance.model.User;
import com.springboot.vehicleInsurance.repository.OfficerRepository;

@Service
public class OfficerService {
	
	private OfficerRepository officerRepository;
	private UserService userService;
	
	

	public OfficerService(OfficerRepository officerRepository, UserService userService) {
		super();
		this.officerRepository = officerRepository;
		this.userService = userService;
	}




	public Officer addOfficer(Officer officer) {
		// Fetch user from Officer
		User user = officer.getUser();
		
		// Set Officer role in user
		user.setRole("OFFICER");
		
		// Save User in DB
		user = userService.signUp(user);
		
		
		// Attach user in officer
		officer.setUser(user);
		
		// Save office in DB
		return officerRepository.save(officer);
	}

}
