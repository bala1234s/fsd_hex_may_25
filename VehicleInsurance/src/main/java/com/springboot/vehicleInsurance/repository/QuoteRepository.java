package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.vehicleInsurance.model.Quote;

public interface QuoteRepository extends JpaRepository<Quote, Integer>{

}
