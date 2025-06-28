package com.springboot.vehicleInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.AddOnsDetails;
import com.springboot.vehicleInsurance.service.AddOnsDetailsService;

@RestController
@RequestMapping("api/addons/details")
@CrossOrigin(origins = "http://localhost:5173")
public class AddOnsDetailsController {

  
	
	@Autowired
	private AddOnsDetailsService addOnsDetailsService;

	
	/*
	 * Aim : To post the Addons 
	 * Path : api/addons/details/add/
	 * Method : Post
	 * Input : AddOnsDetails addOns
	 * Reponse : AddOnsDetails
	 * 
	 * */
	@PostMapping("/add")
	public ResponseEntity<?> addAddonsDetails(@RequestBody AddOnsDetails addOnsDetails) {
		
		return ResponseEntity.status(HttpStatus.OK).body(addOnsDetailsService.addAddonsDetails(addOnsDetails));
	}
	
	/*
	 * Aim : To get the AddonsDetails
	 * Path : api/addons/details/get-all
	 * Method : Get
	 * Reponse : List<AddOnsDetails> addOns
	 * 
	 * 
	 * */
	@GetMapping("/get-all")
	public List<AddOnsDetails> getAddOnsDetails() {
		return addOnsDetailsService.getAddOnsDetails();
	}
	
	@PutMapping("update/{id}")
    public AddOnsDetails updateAddOn(@PathVariable int id, @RequestBody AddOnsDetails addOn) {
        return addOnsDetailsService.updateAddOn(id, addOn);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteAddOn(@PathVariable int id) {
    	addOnsDetailsService.deleteAddOn(id);
        return ResponseEntity.status(HttpStatus.CREATED).body("Add-On Deleted Successfully");
    }
}	
