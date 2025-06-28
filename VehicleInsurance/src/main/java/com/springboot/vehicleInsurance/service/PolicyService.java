package com.springboot.vehicleInsurance.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.exception.ResourceNotFoundException;
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

	public List<EPolicy> getAllV2() {
		
		return policyRepository.findAll();
	}

	public EPolicy updatePolicy(int policyId, EPolicy newPolicy) {
        EPolicy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new ResourceNotFoundException("Policy Not Found"));

        if (newPolicy.getPolicyName() != null) {
            policy.setPolicyName(newPolicy.getPolicyName());
        }
        if (newPolicy.getPrice() != 0) {
            policy.setPrice(newPolicy.getPrice());
        }
        if (newPolicy.getPolicyType() != null) {
            policy.setPolicyType(newPolicy.getPolicyType());
        }
        if (newPolicy.getDescription() != null) {
            policy.setDescription(newPolicy.getDescription());
        }
        // Add more fields if needed

        return policyRepository.save(policy);
    }

    public void deletePolicy(int policyId) {
        policyRepository.deletePolicy(policyId);
    }
}
