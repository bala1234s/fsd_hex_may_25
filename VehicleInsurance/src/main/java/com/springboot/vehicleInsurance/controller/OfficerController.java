package com.springboot.vehicleInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.Officer;
import com.springboot.vehicleInsurance.service.OfficerService;

@RestController
@RequestMapping("api/officer")
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
	
	
}
