package com.springboot.vehicleInsurance.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.model.AddOnsDetails;
import com.springboot.vehicleInsurance.repository.AddOnsDetailsRepository;

@Service
public class AddOnsDetailsService {

	private AddOnsDetailsRepository addOnsDetailsRepository;
	
	
	public AddOnsDetailsService(AddOnsDetailsRepository addOnsDetailsRepository) {
		super();
		this.addOnsDetailsRepository = addOnsDetailsRepository;
	}


	public AddOnsDetails addAddonsDetails(AddOnsDetails addOnsDetails) {
		return addOnsDetailsRepository.save(addOnsDetails);
		
	}


	public List<AddOnsDetails> getAddOnsDetails() {
	
		return addOnsDetailsRepository.findAll();
	}

}
