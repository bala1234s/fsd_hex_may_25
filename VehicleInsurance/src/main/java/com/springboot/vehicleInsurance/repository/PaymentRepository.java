package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.vehicleInsurance.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer>{

	@Query("select p from Payment p where p.quote.policyHolder.id = ?1")
	Payment getPaymentByHolderId(int policyHolderId);

}
