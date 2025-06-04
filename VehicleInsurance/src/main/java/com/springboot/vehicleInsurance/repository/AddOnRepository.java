package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.vehicleInsurance.model.AddOns;

public interface AddOnRepository extends JpaRepository<AddOns, Integer>{

}
