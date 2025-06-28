package com.springboot.vehicleInsurance.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.exception.ResourceNotFoundException;
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



	public List<Vehicle> getCustomerByUsername(String username) {
		
		return vehicleRepository.getCustomerByUsername(username);
	}



	public Vehicle updateVehicle(int vehicleId, Vehicle newVechile) {
		// Get Vehicle by vehicle id
		Vehicle vehicle = vehicleRepository.findById(vehicleId)
				.orElseThrow(()-> new ResourceNotFoundException("Vehicle Not Found"));
		
		if(newVechile.getVehicleType() != null) {
			vehicle.setVehicleType(newVechile.getVehicleType());
		}
		if(newVechile.getVehicleModel() != null) {
			vehicle.setVehicleModel(newVechile.getVehicleModel());
		}
		if(newVechile.getVehicleValue() != 0) {
			vehicle.setVehicleValue(newVechile.getVehicleValue());
		}
		if(newVechile.getPurchaseDate() != null) {
			vehicle.setPurchaseDate(newVechile.getPurchaseDate());
		}
		if(newVechile.getRegistrationNumber() != null) {
			vehicle.setRegistrationNumber(newVechile.getRegistrationNumber());
		}
		// save the Vehicle
		return vehicleRepository.save(vehicle);
	}



	public void deleteVehicle(int vehicleId) {
		
		vehicleRepository.deleteVehicle(vehicleId);
	}

}
