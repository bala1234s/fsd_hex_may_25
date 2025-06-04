package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.vehicleInsurance.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{

}
