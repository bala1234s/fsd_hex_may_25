package com.springboot.vehicleInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.Payment;
import com.springboot.vehicleInsurance.service.PaymentService;

@RestController
@RequestMapping("api/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;
	
	/*
	 * Aim : To make payment for the Policy by the Quote Permium
	 * Path : api/payment/pay/{policyHolderId}
	 * Method : Post
	 * Input : PolicyHolderId and Payment
	 * Response : Payment 
	 * 
	 * */
	
	@PostMapping("/pay/{policyHolderId}")
	public Payment pay(@PathVariable int policyHolderId, @RequestBody Payment payment) {
		
		return paymentService.pay(policyHolderId, payment);
	}
	
	/*
	 * Aim : Get Payment details by PolicyHolderId
	 * Path : api/payment/get-one/{policyHolder}
	 * Method : Get
	 * Input : Policy Holder ID
	 * Response : Payment
	 * 
	 * */
	
	@GetMapping("/get-one")
	public Payment getPaymentByHolderId(@RequestParam int policyHolderId) {
		return paymentService.getPaymentByHolderId(policyHolderId);
	}
	
	/*
	 * Aim : Get All Payment 
	 * Path : api/payment/get-all
	 * Method : Get
	 * Response :List< Payment>
	 * 
	 * */
	
	
	@GetMapping("get-all")
	public List<Payment> getAllPayment() {
		return paymentService.getAllPayment();
	}
}
