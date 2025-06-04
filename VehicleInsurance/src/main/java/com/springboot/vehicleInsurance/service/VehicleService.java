package com.springboot.vehicleInsurance.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.model.Vehicle;
import com.springboot.vehicleInsurance.repository.CustomerRepository;
import com.springboot.vehicleInsurance.repository.VehicleRepository;

@Service
public class VehicleService {
	
	private VehicleRepository vehicleRepository;
	private CustomerRepository customerRepository;
	
	
	public VehicleService(VehicleRepository vehicleRepository, CustomerRepository customerRepository) {
		super();
		this.vehicleRepository = vehicleRepository;
		this.customerRepository = customerRepository;
	}



	public Vehicle add(int customerId, Vehicle vehicle) {
		// fetch Customer by customerId
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(()-> new RuntimeException("Invalid Customer Id"));
		
		// Attach Customer to Vehicle
		vehicle.setCustomer(customer);
		
		// Save the Vehicle in Database
		return vehicleRepository.save(vehicle);
	}



	public List<Vehicle> getAll() {
		// fetch all vehicle 
		return vehicleRepository.findAll();
	}



	public List<Vehicle> getByCustomerId(int customerId) {
		// fetch Customer by customerId
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(()-> new RuntimeException("Invalid Customer Id"));
		return vehicleRepository.getByCustomerId(customerId);
	}



	public Vehicle getVehicleByCustomerId(int customerId, int vehicleId) {
		return vehicleRepository.getVehicleByCustomerId(customerId, vehicleId);
	}

}
