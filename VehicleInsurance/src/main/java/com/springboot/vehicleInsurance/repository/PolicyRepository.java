package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.vehicleInsurance.model.EPolicy;

public interface PolicyRepository extends JpaRepository<EPolicy, Integer>{

}
