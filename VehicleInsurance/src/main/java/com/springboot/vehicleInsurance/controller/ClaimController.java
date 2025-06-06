package com.springboot.vehicleInsurance.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.Claim;
import com.springboot.vehicleInsurance.service.ClaimService;

@RestController
@RequestMapping("api/claim")
public class ClaimController {

	@Autowired
	private ClaimService claimService;
	
	/*
	 * Aim : To claim the policy by the policy Holder
	 * Path : api/claim/request/{policyHolderId}
	 * Method : Post
	 * Input : policyHolderId , Claim
	 * Response : Claim
	 * 
	 * */
	
	@PostMapping("/request/{policyHolderId}")
	public Claim claimRequest(@PathVariable int policyHolderId, @RequestBody Claim claim) {
		
		return claimService.claimRequest(policyHolderId, claim);
	}
	
	/*
	 * Aim : TO get the claim record by policy Holder 
	 * path : api/claim/get-one/{policyHolderId}
	 * Method : Get
	 * Input : Policy Holder Id
	 * Response : PolicyHolder
	 * */
	
	@GetMapping("get-one")
	public Claim getClaimByPolicyHolderId(Principal principal) {
		String username = principal.getName();
		
		return claimService.getClaimByPolicyHolderId(username);
		
	}
}
