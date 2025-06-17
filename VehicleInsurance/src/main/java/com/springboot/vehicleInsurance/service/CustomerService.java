package com.springboot.vehicleInsurance.service;



import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.model.User;
import com.springboot.vehicleInsurance.model.Vehicle;
import com.springboot.vehicleInsurance.repository.CustomerRepository;

@Service
public class CustomerService {
	
	private CustomerRepository customerRepository;
	private UserService userService;
	Logger logger = LoggerFactory.getLogger("CustomerService");
	
   public CustomerService(CustomerRepository customerRepository, UserService userService) {
		super();
		this.customerRepository = customerRepository;
		this.userService = userService;
	}


/*Add new Customer*/
	public Customer insertCustomer(Customer customer) {
		// Get User object from the Customer
		User user = customer.getUser();
		logger.info("Fetch User from Customer");
		
		// Set Role in User
		user.setRole("CUSTOMER");
		 
		// User Save in DB
		
		user = userService.signUp(user);
		logger.info("User Details saved in DB");
		
		// Attach User in Customer
		customer.setUser(user);
		System.out.println(customer.getAge());
		System.out.println(customer.getDOB());
		// Save Customer in DB
		return customerRepository.save(customer);
	}


	/*Get all Customer*/
	public List<Customer> getAll() {
		
		return customerRepository.findAll();
	}


	/*Get Customer By id*/
	public Customer getById(int id) {
		
		return customerRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("Invalid ID: " + id));
	}


	public void deleteById(int id) {
		customerRepository.deleteById(id);
		
	}


	public Customer update(int id, Customer updateCustomer) {
		
		// Fetch Customer by CustomerId
	    Customer customer = customerRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));

	    if (updateCustomer.getName() != null) {
	        customer.setName(updateCustomer.getName());
	    }
	    if (updateCustomer.getDOB() != null) {
	        customer.setDOB(updateCustomer.getDOB()); 
	    }
	    if (updateCustomer.getAddress() != null) {
	        customer.setAddress(updateCustomer.getAddress());
	    }
	    if (updateCustomer.getAadharNumber() != null) {
	        customer.setAadharNumber(updateCustomer.getAadharNumber());
	    }
	    if (updateCustomer.getPanNumber() != null) {
	        customer.setPanNumber(updateCustomer.getPanNumber());
	    }

	    return customerRepository.save(customer);
	}


	public Customer getByUsername(String username) {
		
		return customerRepository.getByUsername(username);
	}





	

	

}
