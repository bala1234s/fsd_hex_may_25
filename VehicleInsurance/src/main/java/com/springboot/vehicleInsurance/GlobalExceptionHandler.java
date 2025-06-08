package com.springboot.vehicleInsurance;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.springboot.vehicleInsurance.exception.ClaimNotFoundException;
import com.springboot.vehicleInsurance.exception.CustomerNotFoundException;
import com.springboot.vehicleInsurance.exception.InsufficientPaymentException;
import com.springboot.vehicleInsurance.exception.PaymentNotFoundException;
import com.springboot.vehicleInsurance.exception.PolicyHolderNotFoundException;
import com.springboot.vehicleInsurance.exception.PolicyNotFoundException;
import com.springboot.vehicleInsurance.exception.QuoteNotFoundException;
import com.springboot.vehicleInsurance.exception.ResourceNotFoundException;

import io.jsonwebtoken.security.SignatureException;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	/*
	 * Whenever RuntimeException throw in Controller ,
	 * this method will call
	 * */
	@ExceptionHandler(exception = RuntimeException.class)
	public ResponseEntity<?> handleRunTime(RuntimeException e) {
		Map<String, String> map = new HashMap<>();
		map.put("message",e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	}
	
	/*More actions
	 * Whenever a token is invalid , 
	 * this method gets called
	 * */
	@ExceptionHandler(exception = SignatureException.class)
	public ResponseEntity<?> handleSignatureException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(map);
	}
	
	/*
	 * Whenever Customer is invalid throw in Controller ,
	 * this method will call
	 * */
	@ExceptionHandler(exception = CustomerNotFoundException.class)
	public ResponseEntity<?> handleCustomerInvalid(CustomerNotFoundException e) {
		Map<String, String> map = new HashMap<>();
		map.put("message",e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	}
	
	/*
	 * Whenever policy is invalid throw in Controller ,
	 * this method will call
	 * */
	@ExceptionHandler(exception = PolicyNotFoundException.class)
	public ResponseEntity<?> handlePolicyInvalid(PolicyNotFoundException e) {
		Map<String, String> map = new HashMap<>();
		map.put("message",e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	}
	
	/*
	 * Whenever PolicyHolder Not Found is invalid throw in Controller ,
	 * this method will call
	 * */
	@ExceptionHandler(exception = PolicyHolderNotFoundException.class)
	public ResponseEntity<?> handlePolicyHolderInvalid(PolicyHolderNotFoundException e) {
		Map<String, String> map = new HashMap<>();
		map.put("message",e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	}
	
	/*
	 * Whenever Claim Not Found is invalid throw in Controller ,
	 * this method will call
	 * */
	@ExceptionHandler(exception = ClaimNotFoundException.class)
	public ResponseEntity<?> handleClaimInvalid(ClaimNotFoundException e) {
		Map<String, String> map = new HashMap<>();
		map.put("message",e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	}
	
	
	/*
	 * Whenever Insufficient Payment Not Found is invalid throw in Controller ,
	 * this method will call
	 * */
	@ExceptionHandler(exception = InsufficientPaymentException.class)
	public ResponseEntity<?> handleInsufficientPaymentInvalid(InsufficientPaymentException e) {
		Map<String, String> map = new HashMap<>();
		map.put("message",e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	}
	
	
	/*
	 * Whenever Payment Not Found is invalid throw in Controller ,
	 * this method will call
	 * */
	@ExceptionHandler(exception = PaymentNotFoundException.class)
	public ResponseEntity<?> handlePaymentInvalid(PaymentNotFoundException e) {
		Map<String, String> map = new HashMap<>();
		map.put("message",e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	}
	
	/*
	 * Whenever Quote Not Found is invalid throw in Controller ,
	 * this method will call
	 * */
	@ExceptionHandler(exception = QuoteNotFoundException.class)
	public ResponseEntity<?> handleQuoteInvalid(QuoteNotFoundException e) {
		Map<String, String> map = new HashMap<>();
		map.put("message",e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	}
	
	
	/*
	 * Whenever Resource Not Found is invalid throw in Controller ,
	 * this method will call
	 * */
	@ExceptionHandler(exception = ResourceNotFoundException.class)
	public ResponseEntity<?> handleQuoteInvalid(ResourceNotFoundException e) {
		Map<String, String> map = new HashMap<>();
		map.put("message",e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
	}
}
