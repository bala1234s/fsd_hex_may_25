package com.springboot.vehicleInsurance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class VehicleInsuranceApplication {

	public static void main(String[] args) {
		SpringApplication.run(VehicleInsuranceApplication.class, args);
	}

}
