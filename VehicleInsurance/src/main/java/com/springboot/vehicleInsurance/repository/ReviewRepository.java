package com.springboot.vehicleInsurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.vehicleInsurance.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{

	@Query("select r from Review r where r.policyHolder.policy.id = ?1")
	List<Review> getReviewByPolicyId(int policyId);

	

}
