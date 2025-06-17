package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.vehicleInsurance.model.Officer;

public interface OfficerRepository extends JpaRepository<Officer, Integer> {
    
    @Query("select f from Officer f where f.user.username = ?1")
    Officer getOfficerByUsername(String username);

}
