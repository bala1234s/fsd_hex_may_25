package com.springboot.vehicleInsurance.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.dto.PolicyHolderRequest;
import com.springboot.vehicleInsurance.exception.PaymentNotFoundException;
import com.springboot.vehicleInsurance.exception.PolicyHolderNotFoundException;
import com.springboot.vehicleInsurance.exception.ResourceNotFoundException;
import com.springboot.vehicleInsurance.model.AddOns;
import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.model.EPolicy;
import com.springboot.vehicleInsurance.model.Payment;
import com.springboot.vehicleInsurance.model.PolicyHolder;
import com.springboot.vehicleInsurance.model.Vehicle;
import com.springboot.vehicleInsurance.repository.AddOnRepository;
import com.springboot.vehicleInsurance.repository.CustomerRepository;
import com.springboot.vehicleInsurance.repository.PolicyHolderRepository;
import com.springboot.vehicleInsurance.repository.PolicyRepository;
import com.springboot.vehicleInsurance.repository.VehicleRepository;

@Service
public class PolicyHolderService {
	
	private PolicyHolderRepository holderRepository;
	private CustomerRepository customerRepository;
	private VehicleRepository vehicleRepository;
	private PolicyRepository policyRepository;
	private VehicleService vehicleService;
	private AddOnService addOnService;
	private AddOnRepository addOnRepository;
	private PaymentService paymentService;
	private PolicyHolderRequest holderRequest;
	
	/* Logger Inject*/
	Logger logger = LoggerFactory.getLogger("PolicyHolderService");
	

	

	public PolicyHolderService(PolicyHolderRepository holderRepository, CustomerRepository customerRepository,
			VehicleRepository vehicleRepository, PolicyRepository policyRepository, VehicleService vehicleService,
			AddOnService addOnService, AddOnRepository addOnRepository, PaymentService paymentService,
			PolicyHolderRequest holderRequest) {
		super();
		this.holderRepository = holderRepository;
		this.customerRepository = customerRepository;
		this.vehicleRepository = vehicleRepository;
		this.policyRepository = policyRepository;
		this.vehicleService = vehicleService;
		this.addOnService = addOnService;
		this.addOnRepository = addOnRepository;
		this.paymentService = paymentService;
		this.holderRequest = holderRequest;
	}





	// Add new policy 
	public void add(int customerId, int vehicleId, int policyId, PolicyHolder holder, List<AddOns> addOns) {
		logger.info("Adding New Policy for the Customer");
	    Customer customer = customerRepository.findById(customerId)
	            .orElseThrow(() -> new RuntimeException("Invalid Customer ID"));
	    logger.info("fetch Customer by CustomerId");

	    Vehicle vehicle = vehicleService.getVehicleByCustomerId(customerId, vehicleId);
	    logger.info("fetch Vehicle by vehicle Id");
	    if (vehicle == null) { 
	    	logger.error("Vehicle Not found");
	        throw new ResourceNotFoundException("Vehicle not found");
	    }

	    EPolicy policy = policyRepository.findById(policyId)
	            .orElseThrow(() -> new RuntimeException("Invalid Policy ID"));

	    logger.info("fetch policy by policy id");
	    
	    
	    policy.setPrice(policy.getPrice() * holder.getPlanYear());
	    vehicle.setCustomer(customer);
	    holder.setVehicle(vehicle);
	    holder.setPolicy(policy);
	    holder.setStatus("PENDING");
	    holder.setActive(false);

	    PolicyHolder savedHolder = holderRepository.save(holder);

	    // Save AddOns only if present
	    if (addOns != null && !addOns.isEmpty()) {
	        addOnService.addBatchAddOns(savedHolder.getId(), addOns);
	    }
	}





	public List<PolicyHolder> getAll() {
		// Fetch All Policy Holder
		return holderRepository.getAllPolicyHolder();
	}




	public List<PolicyHolder> getByCustomerId(int customerId) {
		logger.info("Fetch Policy Holder by Customer Id");
		// Fetch Customer by customerId
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(()-> new RuntimeException("Invalid Customer ID"));
		logger.info("fetch Customer by CustomerId");
		return holderRepository.getByCustomerId(customerId);
	}





	public List<PolicyHolder> getByVehicleId(int vehicleId) {
		// Fetch Vehicle by vehicle ID
		Vehicle vehicle = vehicleRepository.findById(vehicleId)
				.orElseThrow(()-> new RuntimeException("Invalid Vehicle ID"));
		
		return holderRepository.getByVehicleId(vehicleId);
	}




	public List<PolicyHolder> getByPolicyId(int policyId) {
		// Fetch Policy by policy Id
		EPolicy policy = policyRepository.findById(policyId)
				.orElseThrow(()-> new RuntimeException("Invalid Policy ID"));
		return holderRepository.getByPolicyId(policyId);
	}
	
	
	public PolicyHolder getByCustomerIdVehicleId(int customerId, int vehicleId) {
		// Fetch Customer by customerId
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(()-> new RuntimeException("Invalid Customer ID"));
		
		// Fetch Vehicle by vehicle ID
		Vehicle vehicle = vehicleRepository.findById(vehicleId)
				.orElseThrow(()-> new RuntimeException("Invalid Vehicle ID"));
		
		
		return holderRepository.getByCustomerIdVehicleId(customerId, vehicleId);
	}




	public PolicyHolder getByCustomerIdVehicleIdPolicyId(int customerId, int vehicleId, int policyId) {
		// Fetch Customer by customerId
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(()-> new RuntimeException("Invalid Customer ID"));
		
		// Fetch Vehicle by vehicle ID
		Vehicle vehicle = vehicleRepository.findById(vehicleId)
				.orElseThrow(()-> new RuntimeException("Invalid Vehicle ID"));
		
		// Fetch Policy by policy Id
		EPolicy policy = policyRepository.findById(policyId)
				.orElseThrow(()-> new RuntimeException("Invalid Policy ID"));
		return holderRepository.getByCustomerIdVehicleIdPolicyId(customerId, vehicleId, policyId);
	}


	public PolicyHolder getByCustomerAndPolicy(int customerId, int policyId) {
		// Fetch Customer by customerId
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(()-> new RuntimeException("Invalid Customer ID"));
		// Fetch Policy by policy Id
		EPolicy policy = policyRepository.findById(policyId)
				.orElseThrow(()-> new RuntimeException("Invalid Policy ID"));
				
		return holderRepository.getByCustomerAndPolicy(customerId, policyId);
	}


	public PolicyHolder approvePolicy(int policyHolderId) {
	    PolicyHolder holder = holderRepository.findById(policyHolderId)
	            .orElseThrow(() -> new RuntimeException("Policy Holder Not Found"));

	    Payment payment = paymentService.getPaymentByHolderId(policyHolderId);
	    if (payment == null) {
	        throw new PaymentNotFoundException("Payment is not complete yet!!!");
	    }

	    holder.setActive(true);
	    holder.setStatus("APPROVED");

	    return holderRepository.save(holder); 
	}





	public List<PolicyHolder> getByCustomerUsername(String username) {
		
		
		return holderRepository.getByCustomerUsername(username);
	}



	public List<PolicyHolderRequest> getAllWithAddons() {
	    List<PolicyHolderRequest> list = new ArrayList<>();
	    
	    List<PolicyHolder> policyHolders = holderRepository.findAll();
	    
	    for (PolicyHolder p : policyHolders) {
	        PolicyHolderRequest dto = new PolicyHolderRequest();
	        dto.setHolder(p);
	        dto.setAddOns(addOnRepository.getByPolicyHolderId(p.getId())); // you need this method in repository
	        list.add(dto);
	    }
	    
	    return list;
	}





	public PolicyHolderRequest getHolderWithAddons(int policyHolderId) {
	
		// Get Policy Holder by id
		PolicyHolder holder = holderRepository.findById(policyHolderId)
				.orElseThrow(()-> new PolicyHolderNotFoundException("Policy Holder Not Found"));

		// Get Addons by PolicyHolderID
		List<AddOns> addOns = addOnService.getByPolicyHolderId(policyHolderId);
		if(addOns.isEmpty() || addOns== null) {
			
			holderRequest.setAddOns(null);
		}
		holderRequest.setHolder(holder);
		holderRequest.setAddOns(addOns);
		return holderRequest;
	}







}
