package com.springboot.vehicleInsurance.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.vehicleInsurance.model.AddOns;
import com.springboot.vehicleInsurance.model.PolicyHolder;
import com.springboot.vehicleInsurance.repository.AddOnRepository;
import com.springboot.vehicleInsurance.repository.PolicyHolderRepository;

@Service
public class AddOnService {
	
	private AddOnRepository addOnRepository;
	private PolicyHolderRepository policyHolderRepository;
	


	public AddOnService(AddOnRepository addOnRepository, PolicyHolderRepository policyHolderRepository) {
		super();
		this.addOnRepository = addOnRepository;
		this.policyHolderRepository = policyHolderRepository;
	}




	@Transactional
	public void addBatchAddOns(int policyHolderId, List<AddOns> addOns) {
		PolicyHolder policyHolder = policyHolderRepository.findById(policyHolderId).orElseThrow(()-> new RuntimeException("Policy Holder Not Found"));
		
		
		addOns.parallelStream().forEach(a-> {
			a.setPolicyHolder(policyHolder);
		});
		addOnRepository.saveAll(addOns);
	}

}
