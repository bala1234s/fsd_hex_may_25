package com.springboot.vehicleInsurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.vehicleInsurance.model.PolicyHolder;

public interface PolicyHolderRepository extends JpaRepository<PolicyHolder, Integer> {

	@Query("select ph from PolicyHolder ph where ph.vehicle.customer.id = ?1")
	List<PolicyHolder> getByCustomerId(int customerId); 
	
	@Query("select ph from PolicyHolder ph where ph.vehicle.id = ?1")
	List<PolicyHolder> getByVehicleId(int vehicleId);
	
	@Query("select ph from PolicyHolder ph where ph.policy.id = ?1")
	List<PolicyHolder> getByPolicyId(int policyId);
	
	@Query("SELECT ph FROM PolicyHolder ph WHERE ph.vehicle.customer.id = ?1 AND ph.vehicle.id = ?2")
	PolicyHolder getByCustomerIdVehicleId(int customerId, int vehicleId);

	@Query("SELECT ph FROM PolicyHolder ph WHERE ph.vehicle.customer.id = ?1 AND ph.vehicle.id = ?2 AND ph.policy.id = ?3")
	PolicyHolder getByCustomerIdVehicleIdPolicyId(int customerId, int vehicleId, int policyId);

	@Query("SELECT ph FROM PolicyHolder ph WHERE ph.vehicle.customer.id = ?1 AND ph.policy.id = ?2")
	PolicyHolder getByCustomerAndPolicy(int customerId, int policyId);

	@Query("select ph,a from PolicyHolder ph join AddOns a on a.policyHolder.id = ph.id ")
	List<PolicyHolder> getAllPolicyHolder();
	
	@Query("select ph from PolicyHolder ph where ph.vehicle.customer.user.username = ?1")
	PolicyHolder getPolicyHolderByUsername(String username);
	
	@Query("select ph from PolicyHolder ph where ph.vehicle.customer.user.username = ?1")
	List<PolicyHolder> getByCustomerUsername(String username);

	


}
