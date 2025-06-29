package com.springboot.vehicleInsurance.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.Officer;
import com.springboot.vehicleInsurance.service.OfficerService;

@RestController
@RequestMapping("api/officer")
@CrossOrigin(origins = "http://localhost:5173")
public class OfficerController {

	@Autowired
	private OfficerService officerService;
	
	/*
	 * Aim : To add officer 
	 * Path : api/officer/add
	 * Response : Officer
	 * Input : Officer
	 * 
	 * */
	
	@PostMapping("/add")
	public Officer addOfficer(@RequestBody Officer officer) {
		return officerService.addOfficer(officer);
	}
	
	/*
	 * Aim : To get officer 
	 * Path : api/officer/get
	 * Response : Officer
	 * 
	 * 
	 * */
	@GetMapping("/get")
	public Officer getOfficer(Principal principal) {
		return officerService.getOfficer(principal.getName());
	}
	
	/*
	 * Aim : To update officer 
	 * Path : api/officer/update/{officerId}
	 * Response : Officer
	 * 
	 * 
	 * */
	@PutMapping("/update/{officerId}")
	public Officer updateOfficer(@PathVariable int officerId, @RequestBody Officer officer) {
		return officerService.updateOfficer(officerId, officer);
	}
	
	
}
