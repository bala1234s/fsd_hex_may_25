package com.springboot.vehicleInsurance.service;



import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.vehicleInsurance.exception.CustomerNotFoundException;
import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.model.User;
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
	public Customer insertCustomer( Customer customer) {
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
		System.out.println(customer.getdob());
		
		// Save Customer in DB
		return customerRepository.save(customer);
	}

//   public Customer insertCustomerWithImage(Customer customer, MultipartFile file) throws IOException {
//	    // Set user role
//	    User user = customer.getUser();
//	    user.setRole("CUSTOMER");
//	    user = userService.signUp(user);
//
//	    // File handling
//	    String originalFileName = file.getOriginalFilename();
//	    String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1).toLowerCase();
//
//	    if (!List.of("jpg", "jpeg", "png", "gif", "svg").contains(extension)) {
//	        throw new RuntimeException("Invalid file extension: " + extension);
//	    }
//
//	    long kbs = file.getSize() / 1024;
//	    if (kbs > 3000) {
//	        throw new RuntimeException("Image too large! Max 3000KB");
//	    }
//
//	    String uploadPath = "D:\\Hexaware\\Phase 3\\Springboot\\Case Study\\VehicleInsurance-UI\\public\\ProfilePic";
//	    Files.createDirectories(Path.of(uploadPath));
//	    Path path = Paths.get(uploadPath, originalFileName);
//	    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
//
//	    customer.setUser(user);
//	    customer.setProfilePic(originalFileName);
//	    return customerRepository.save(customer);
//	}


	/*Get all Customer*/
	public List<Customer> getAll() {
		
		return customerRepository.findAll();
	}


	/*Get Customer By id*/
	public Customer getById(int id) {
		
		return customerRepository.findById(id)
		        .orElseThrow(() -> new CustomerNotFoundException("Invalid ID: " + id));
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
	    if (updateCustomer.getdob() != null) {
	        customer.setdob(updateCustomer.getdob()); 
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




	public Customer uploadProfilePic(MultipartFile file, int customerId) throws IOException {
	    Customer customer = customerRepository.findById(customerId)
	    		.orElseThrow(()-> new CustomerNotFoundException("Customer Not Found"));
	    logger.info("Customer Name: " + customer.getName());

	    String originalFileName = file.getOriginalFilename();
	    String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1).toLowerCase();

	    // Validate file type
	    if (!List.of("jpg", "jpeg", "png", "gif", "svg").contains(extension)) {
	        throw new RuntimeException("Invalid file extension: " + extension + ". Allowed: jpg, jpeg, png, gif, svg.");
	    }

	    long kbs = file.getSize() / 1024;
	    if (kbs > 3000) {
	        throw new RuntimeException("Image size too large: " + kbs + "KB. Max allowed is 3000KB.");
	    }

	    String uploadPath = "D:\\Hexaware\\Phase 3\\Springboot\\Case Study\\VehicleInsurance-UI\\public\\ProfilePic";
	    Files.createDirectories(Path.of(uploadPath));
	    Path path = Paths.get(uploadPath, originalFileName);
	    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

	    customer.setProfilePic(originalFileName);
	    return customerRepository.save(customer);
	}


	public Customer insertCustomerWithImage(
	        String name,
	        String dob,
	        String contact,
	        String aadharNumber,
	        String panNumber,
	        String address,
	        String username,
	        String password,
	        MultipartFile file) throws IOException {

	    // Step 1: Create and save User
	    User user = new User();
	    user.setUsername(username);
	    user.setPassword(password);
	    user.setRole("CUSTOMER");
	    user = userService.signUp(user); // Save and get persisted user

	    // Step 2: Create Customer and attach user
	    Customer customer = new Customer();
	    customer.setName(name);
	    customer.setContact(contact);
	    customer.setAadharNumber(aadharNumber);
	    customer.setPanNumber(panNumber);
	    customer.setAddress(address);
	    customer.setdob(LocalDate.parse(dob)); // Convert DOB from string
	    customer.setUser(user);

	    // Step 3: Validate and upload image
	    String originalFileName = file.getOriginalFilename();
	    String extension = originalFileName.substring(originalFileName.lastIndexOf('.') + 1).toLowerCase();

	    if (!List.of("jpg", "jpeg", "png", "gif", "svg").contains(extension)) {
	        throw new RuntimeException("Invalid file extension: " + extension + ". Allowed: jpg, jpeg, png, gif, svg");
	    }

	    long kbs = file.getSize() / 1024;
	    if (kbs > 3000) {
	        throw new RuntimeException("Image too large: " + kbs + " KB. Max allowed: 3000 KB");
	    }

	    // Step 4: Save the file to disk
	    String uploadPath = "D:\\Hexaware\\Phase 3\\Springboot\\Case Study\\VehicleInsurance-UI\\public\\ProfilePic";
	    Files.createDirectories(Path.of(uploadPath));
	    Path path = Paths.get(uploadPath, originalFileName);
	    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

	    // Step 5: Set profilePic and save Customer
	    customer.setProfilePic(originalFileName);
	    return customerRepository.save(customer);
	}



	

	

}
