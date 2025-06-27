package com.springboot.vehicleInsurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.vehicleInsurance.model.Claim;
import com.springboot.vehicleInsurance.model.Customer;

public interface ClaimRepository extends JpaRepository<Claim, Integer>{

	@Query("select c from Claim c where c.policyHolder.id = ?1")
	Claim getClaimByPolicyHolderId(int policyHolderId);

	@Query("select c from Claim c where c.policyHolder.id = ?1")
	List<Claim> getClaimsListByPolicyHolderId(int policyHolderId);
	
	

}
