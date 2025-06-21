package com.springboot.vehicleInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.AddOns;
import com.springboot.vehicleInsurance.service.AddOnService;

@RestController
@RequestMapping("api/add-on")
@CrossOrigin(origins = "http://localhost:5173")
public class AddOnController {
	
	@Autowired
	private AddOnService addOnService;
	
	/*
	 * Aim : To post the Addons with respective PolicyHolder
	 * Path : api/add-ons/add/{policyId}
	 * Method : Post
	 * Input : int policyHolderId, List<AddOns> addOns
	 * Reponse : Addons
	 * 
	 * */
	@PostMapping("/add/{policyId}")
	public ResponseEntity<?> addBatchAddOns(@PathVariable int policyHolderId, List<AddOns> addOns) {
		addOnService.addBatchAddOns(policyHolderId, addOns);
		return ResponseEntity.status(HttpStatus.OK).body("Addons Added Successfully");
	}
	
	/*
	 * Aim : To fetch all addons
	 * Path : api/add-ons/get-all
	 * Method : Get
	 * Reponse : List<AddOns>
	 * 
	 * */
	
	@GetMapping("/get-all")
	public List<AddOns> getAllAddons() {
		return addOnService.getAllAddons();
	}
	
	/*
	 * Aim : To fetch all addons
	 * Path : api/add-ons/get-all
	 * Method : Get
	 * Reponse : List<AddOns>
	 * 
	 * */
	
	@GetMapping("/get-all/{policyHolderId}")
	public List<AddOns> getByPolicyHolderId(@PathVariable int policyHolderId) {
		return addOnService.getByPolicyHolderId(policyHolderId);
	}
	
	

}
