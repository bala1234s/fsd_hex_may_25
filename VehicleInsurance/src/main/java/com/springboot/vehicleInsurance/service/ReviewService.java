package com.springboot.vehicleInsurance.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.exception.ResourceNotFoundException;
import com.springboot.vehicleInsurance.model.PolicyHolder;
import com.springboot.vehicleInsurance.model.Review;
import com.springboot.vehicleInsurance.repository.PolicyHolderRepository;
import com.springboot.vehicleInsurance.repository.ReviewRepository;

@Service
public class ReviewService {
	
	private ReviewRepository reviewRepository;
	private PolicyHolderService holderService;
	private PolicyHolderRepository holderRepository;
	
	


	public ReviewService(ReviewRepository reviewRepository, PolicyHolderService holderService,
			PolicyHolderRepository holderRepository) {
		super();
		this.reviewRepository = reviewRepository;
		this.holderService = holderService;
		this.holderRepository = holderRepository;
	}




	// Method for add new Review by policy holder id
	public Review addReview(int customerId, int policyId, Review review) {
		// Check if customer applied policy
		PolicyHolder holder = holderService.getByCustomerAndPolicy(customerId, policyId);
		if(holder == null ) {
			throw new ResourceNotFoundException("Policy Holder Not found");
		}
		System.out.println(holder.getPolicy().getPolicyName());
		
		// Attach Policy Holder in Review
		review.setPolicyHolder(holder);
		return reviewRepository.save(review);
	}




	public List<Review> getReviewByPolicyId(int policyId) {
		
		return reviewRepository.getReviewByPolicyId(policyId);
	}




	public List<Review> getAllReview() {
		
		return reviewRepository.findAll();
	}

}
