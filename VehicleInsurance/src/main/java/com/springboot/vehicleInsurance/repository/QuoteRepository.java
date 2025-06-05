package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.vehicleInsurance.model.Quote;

public interface QuoteRepository extends JpaRepository<Quote, Integer>{

	@Query("select q from Quote q where q.policyHolder.id = ?1")
	Quote getQuoteByHolderId(int policyHolderId);

}
