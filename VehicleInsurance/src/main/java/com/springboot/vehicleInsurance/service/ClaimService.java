package com.springboot.vehicleInsurance.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.exception.ClaimNotFoundException;
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




	public List<Claim> getAllClaim() {
		
		return claimRepository.findAll();
	}




	public Claim approveClaim(int policyHolderId) {
		
		// Get Policy Holder by Id
		PolicyHolder policyHolder = holderRepository.findById(policyHolderId)
				.orElseThrow(()-> new PolicyHolderNotFoundException("Policy Holder Not Found"));
		// Get Claim by Policy Holder Id
		Claim claim = claimRepository.getClaimByPolicyHolderId(policyHolderId);
		if(claim == null) {
			throw new ClaimNotFoundException("Policy Holder is not apply Claim");
		}
		
		
		// Set Approved Date
		claim.setApprovedDate(LocalDate.now());
		// Set status APPROVED
		claim.setStatus("APPROVED");
		// Set Policy Holder Status CLAIMED
		policyHolder.setStatus("CLAIMED");;
		
		// Put Claim in DB
		return claimRepository.save(claim);
	}

}
