package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.vehicleInsurance.model.Officer;

public interface OfficerRepository extends JpaRepository<Officer, Integer>{

}
