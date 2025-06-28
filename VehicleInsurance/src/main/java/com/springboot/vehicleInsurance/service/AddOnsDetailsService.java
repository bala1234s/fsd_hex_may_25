package com.springboot.vehicleInsurance.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.exception.ResourceNotFoundException;
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

	
	public AddOnsDetails updateAddOn(int id, AddOnsDetails newAddOn) {
        AddOnsDetails existingAddOn = addOnsDetailsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Add-On not found"));

        if (newAddOn.getName() != null) {
            existingAddOn.setName(newAddOn.getName());
        }
        if (newAddOn.getDescription() != null) {
            existingAddOn.setDescription(newAddOn.getDescription());
        }
        if (newAddOn.getPrice() != 0) {
            existingAddOn.setPrice(newAddOn.getPrice());
        }

        return addOnsDetailsRepository.save(existingAddOn);
    }

    public void deleteAddOn(int id) {
    	addOnsDetailsRepository.deleteAddOn(id);
    }
}
