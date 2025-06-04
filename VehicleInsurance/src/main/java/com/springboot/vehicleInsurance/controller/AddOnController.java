package com.springboot.vehicleInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.AddOns;
import com.springboot.vehicleInsurance.service.AddOnService;

@RestController
@RequestMapping("api/add-on")
public class AddOnController {
	
	@Autowired
	private AddOnService addOnService;
	
	@PostMapping("/add/{policyId}")
	public ResponseEntity<?> addBatchAddOns(@PathVariable int policyHolderId, List<AddOns> addOns) {
		addOnService.addBatchAddOns(policyHolderId, addOns);
		return ResponseEntity.status(HttpStatus.OK).body("Addons Added Successfully");
	}

}
