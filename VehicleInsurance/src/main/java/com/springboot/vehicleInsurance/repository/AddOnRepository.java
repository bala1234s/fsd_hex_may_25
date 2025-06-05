package com.springboot.vehicleInsurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.vehicleInsurance.model.AddOns;

public interface AddOnRepository extends JpaRepository<AddOns, Integer>{

	@Query("select a from AddOns a where a.policyHolder.id = ?1 ")
	List<AddOns> getByPolicyHolderId(int policyHolderId);

}
