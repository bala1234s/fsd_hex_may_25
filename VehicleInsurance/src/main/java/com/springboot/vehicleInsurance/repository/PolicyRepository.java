package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.vehicleInsurance.model.EPolicy;

public interface PolicyRepository extends JpaRepository<EPolicy, Integer>{
	@Transactional
    @Modifying
    @Query("delete from EPolicy p where p.id = ?1")
    void deletePolicy(int policyId);
}
