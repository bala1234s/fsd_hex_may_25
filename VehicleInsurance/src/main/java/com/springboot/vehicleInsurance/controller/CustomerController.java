package com.springboot.vehicleInsurance.controller;

import java.security.Principal;
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
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.service.CustomerService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	/* Aim : To add new Customer in DB
	 * Path : localhost:8080/api/customer/add
	 * Method : Post
	 * Input : Customer customer = new Customer
	 *  
	 * */
	
	@PostMapping("api/customer/add")
	public ResponseEntity<Customer> add(@RequestBody Customer customer) {
		
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.insertCustomer(customer));
		
	}
	
	
	
	/*
	 * Aim : Get all Customer from DB
	 * Path : localhost:8080/api/customer/get-all
	 * Method : Get
	 * Input : List<Customer>
	 * 
	 * */
	
	@GetMapping("api/customer/get-all")
	public ResponseEntity<List<Customer>> getAll(){
		return ResponseEntity.status(HttpStatus.OK).body(customerService.getAll());
		
	}
	
	/*
	 * Aim : fetch Customer by CustomerId
	 * Path : localhost:8080/api/customer/get-one/id
	 * Method : Get
	 * Input : id
	 * 
	 * */
	@GetMapping("api/customer/get-one")
	public ResponseEntity<Customer> getOne(Principal principal) {
		String username = principal.getName();
		return ResponseEntity.status(HttpStatus.OK).body(customerService.getByUsername(username));
		
	}
	
	
	/*
	 * Aim : Delete Customer by CustomerId
	 * Path : localhost:8080/api/customer/delete-one/id
	 * Method : Delete
	 * Input : id
	 * 
	 * */
	@DeleteMapping("api/customer/delete-one/{id}")
	public ResponseEntity<?> deleteById(@PathVariable int id){
		customerService.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully : "+id);
		
		
	}
	
	/*
	 * Aim : Update Customer by CustomerId
	 * Path : localhost:8080/api/customer/update/{customerId}
	 * Method : Put
	 * Input : CustomerId , updatedCustomer
	 * */
	
	@PutMapping("api/customer/update/{customerId}")
	public ResponseEntity<Customer> update(@PathVariable int customerId ,@RequestBody Customer updateCustomer) {
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.update(customerId, updateCustomer));
		
		
	}
	
	

}
