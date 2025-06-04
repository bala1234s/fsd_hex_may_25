package com.springboot.vehicleInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.Review;
import com.springboot.vehicleInsurance.service.ReviewService;

@RestController
@RequestMapping("api/review")
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	
	/*
	 * Aim : To post Review for the Policy by Policy Holder
	 * Path : api/review/add
	 * Method : Post
	 * Response : Review
	 * Input : policyHolderId and new Review
	 * 
	 * 
	 * */
	
	@PostMapping("/add/{customerId}/{policyId}")
	public Review addReview(@PathVariable int customerId, @PathVariable int policyId , @RequestBody Review review) {
		return reviewService.addReview(customerId, policyId, review);
	}

}
