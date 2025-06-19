package com.springboot.vehicleInsurance.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.Vehicle;
import com.springboot.vehicleInsurance.repository.VehicleRepository;
import com.springboot.vehicleInsurance.service.VehicleService;

@RestController
@RequestMapping("api/vehicle")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {

   

  
	@Autowired
	private VehicleService vehicleService;


  

	/*
	 * Aim : To add new vehicle by customerId
	 * Path : api/vehicle/add/{customerId}
	 * Response : Vehicle
	 * Input : customerId , new Vehicle
	 * */
	
	@PostMapping("/add/{customerId}")
	public Vehicle add(@PathVariable int customerId , @RequestBody Vehicle vehicle) {
		
		return vehicleService.add(customerId,vehicle);
	}
	
	/*
	 * Aim : Fetch all vehicle
	 * Path : api/vehicle/get
	 * Response : List<Vehicle>
	 * 
	 * */
	
	@GetMapping("/get-all")
	public List<Vehicle> getAll() {
		return vehicleService.getAll();
	}

	/*
	 * Aim : Get Vehicle by customerId
	 * Path : api/vehicle/get-one/{customerId}
	 * Response : List<Vehicle>
	 * Input : customerId 
	 * */
	
	@GetMapping("get-one/{customerId}")
	public List<Vehicle> getByCustomerId(@PathVariable int customerId){
		return vehicleService.getByCustomerId(customerId);
	}
	
	@GetMapping("get")
	public List<Vehicle> getCustomerByUsername(Principal principal){
		return vehicleService.getCustomerByUsername(principal.getName());
	}
	
	
	@GetMapping("get-one/{customerId}/{vehicleId}")
	public Vehicle getVehicleByCustomerId(@PathVariable int customerId, @PathVariable int vehicleId) {
		return vehicleService.getVehicleByCustomerId(customerId, vehicleId);
	}
}
