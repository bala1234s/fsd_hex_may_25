package com.springboot.vehicleInsurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.vehicleInsurance.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer>{

	@Query("select v from Vehicle v where v.customer.id = ?1")
	List<Vehicle> getByCustomerId(int customerId);

	@Query("select v from Vehicle v where v.customer.id = ?1 AND v.id = ?2")
	Vehicle getVehicleByCustomerId(int customerId, int vehicleId);

}
