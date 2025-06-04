package com.springboot.vehicleInsurance.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.model.EPolicy;
import com.springboot.vehicleInsurance.repository.PolicyRepository;
@Service
public class PolicyService {

	
	private PolicyRepository policyRepository;
	
	// Constructor
	public PolicyService(PolicyRepository policyRepository) {
		super();
		this.policyRepository = policyRepository;
	}
	
	// Add new Policy
	public EPolicy add(EPolicy policy) {
		policy.setCreatedDate(LocalDate.now());
		return policyRepository.save(policy);
	}

	public EPolicy getPolicyById(int policyId) {
	
		return policyRepository.findById(policyId).orElseThrow(()-> new RuntimeException("Policy not found"));
	}

	public List<?> getAll(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		
		return policyRepository.findAll(pageable).getContent();
	}

}
