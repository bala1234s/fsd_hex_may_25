package com.springboot.vehicleInsurance.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.exception.PolicyHolderNotFoundException;
import com.springboot.vehicleInsurance.model.Claim;
import com.springboot.vehicleInsurance.model.PolicyHolder;
import com.springboot.vehicleInsurance.repository.ClaimRepository;
import com.springboot.vehicleInsurance.repository.PolicyHolderRepository;

@Service
public class ClaimService {

	private ClaimRepository claimRepository;
	private PolicyHolderRepository holderRepository;
	
	


	public ClaimService(ClaimRepository claimRepository, PolicyHolderRepository holderRepository) {
		super();
		this.claimRepository = claimRepository;
		this.holderRepository = holderRepository;
	}




	public Claim claimRequest(int policyHolderId, Claim claim) {
		// get policy holder by id
		PolicyHolder policyHolder = holderRepository.findById(policyHolderId)
				.orElseThrow(()-> new PolicyHolderNotFoundException("Policy Holder Id is Invalid!!!"));
		
		// set policy holder in Claim
		claim.setPolicyHolder(policyHolder);
		
		// set status as PENDING
		claim.setStatus("PENDING");
		
		// set applied date 
		claim.setAppliedDate(LocalDate.now());
		
		return claimRepository.save(claim);
	}




	public Claim getClaimByPolicyHolderId(String username) {
		PolicyHolder policyHolder = holderRepository.getPolicyHolderByUsername(username);
		if(policyHolder == null) {
			throw new PolicyHolderNotFoundException("Policy Holder Id is Invalid!!!");
		}
		int policyHolderId = policyHolder.getId();
		return claimRepository.getClaimByPolicyHolderId(policyHolderId);
	}

}
