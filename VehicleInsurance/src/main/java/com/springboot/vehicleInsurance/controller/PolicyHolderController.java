package com.springboot.vehicleInsurance.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.dto.PolicyHolderRequest;
import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.model.PolicyHolder;
import com.springboot.vehicleInsurance.service.CustomerService;
import com.springboot.vehicleInsurance.service.PolicyHolderService;
import com.springboot.vehicleInsurance.util.JwtUtil;

@RestController
@RequestMapping("api/policy-holder")
@CrossOrigin(origins = "http://localhost:5173")
public class PolicyHolderController {
	@Autowired
	private PolicyHolderService holderService;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private CustomerService customerService;
	
    /*
     * Aim : Apply new policy for Customer
     * path : api/policy/apply/customerId?customerId=1/vehicleId?vehicleId=2/policyId?policyId=1
     * Method : Post
     * Response : PolicyHolder
     * 
     * */
	

	@PostMapping("/apply")
	public ResponseEntity<?> add(Principal principal,
	                               @RequestParam int vehicleId,
	                               @RequestParam int policyId,
	                               @RequestBody PolicyHolderRequest request) {

	    String username = principal.getName();
	    Customer customer = customerService.getByUsername(username);

	    holderService.add(
	        customer.getId(),
	        vehicleId,
	        policyId,
	        request.getHolder(),
	        request.getAddOns() // pass addOns from request
	    );

	    return ResponseEntity.status(HttpStatus.CREATED).body("Policy Applied Successfully");
	}

	

    /*
     * Aim : Fetch all policy holders
     * Path : api/policy/get-all
     * Method : GET
     * Response : List<PolicyHolder>
     */
    @GetMapping("/get-all")
    public List<PolicyHolder> getAll() {
        return holderService.getAll();
    }
    
    @GetMapping("/getAll") 
    public List<PolicyHolderRequest> getAllWithAddons(){
    	return holderService.getAllWithAddons();
    }
    /*
     * Aim : Get policy holders by customer ID
     * Path : api/policy/get/{customerId}
     * Method : GET
     * Response : List<PolicyHolder>
     */
    @GetMapping("/get/{customerId}")
    public List<PolicyHolder> getByCustomerId(@PathVariable int customerId) {
        return holderService.getByCustomerId(customerId);
    }
    
    /*
     * Aim : Get policy holders by customer ID
     * Path : api/policy/get/{customerId}
     * Method : GET
     * Response : List<PolicyHolder>
     */
    @GetMapping("/get")
    public List<PolicyHolder> getByCustomerUsername(Principal principal) {
        return holderService.getByCustomerUsername(principal.getName());
    }
    
    
    
    /*
     * Aim : Get policy holders by vehicle ID
     * Path : api/policy/get/{customerId}
     * Method : GET
     * Response : List<PolicyHolder>
     */
    @GetMapping("/get/{vehicleId}")
    public List<PolicyHolder> getByVehicleId(@PathVariable int vehicleId) {
        return holderService.getByVehicleId(vehicleId);
    }

    /*
     * Aim : Get policy holders by policy ID
     * Path : api/policy/get/{policyId}
     * Method : GET
     * Response : List<PolicyHolder>
     */
    @GetMapping("/get/{policyId}")
    public List<PolicyHolder> getByPolicyId(@PathVariable int policyId) {
        return holderService.getByPolicyId(policyId);
    }
    /*
     * Aim : Get policy holders by customer ID and vehicle ID
     * Path : api/policy/get/{customerId}/{vehicleId}
     * Method : GET
     * Response : List<PolicyHolder>
     */
    
    @GetMapping("/get-one/{customerId}/{vehicleId}")
    public PolicyHolder getByCustomerAndVehicle(@PathVariable int customerId,
                                                      @PathVariable int vehicleId) {
        return holderService.getByCustomerIdVehicleId(customerId, vehicleId);
    }
    
    
    /*
     * Aim : Get policy holders by customer ID and vehicle ID
     * Path : api/policy/get/{customerId}/{vehicleId}
     * Method : GET
     * Response : List<PolicyHolder>
     */
    
    @GetMapping("/get-one")
    public PolicyHolder getByCustomerAndPolicy(@RequestParam int customerId,
    											@RequestParam int policyId) {
        return holderService.getByCustomerAndPolicy(customerId, policyId);
    }

    /*
     * Aim : Get policy holder by customer ID, vehicle ID, and policy ID
     * Path : api/policy/get/{customerId}/{vehicleId}/{policyId}
     * Method : GET
     * Response : PolicyHolder
     */
    
    @GetMapping("/get/{customerId}/{vehicleId}/{policyId}")
    public PolicyHolder getByAllIds(@PathVariable int customerId,
                                    @PathVariable int vehicleId,
                                    @PathVariable int policyId) {
        return holderService.getByCustomerIdVehicleIdPolicyId(customerId, vehicleId, policyId);
    }
    
    /*
     * Aim : Get policy holder with addons 
     * Path : api/policy/get-one-details/{policyHolderId}
     * Method : GET
     * Response : PolicyHolderRequest
     */
    
    @GetMapping("/get-one-details/{policyHolderId}")
    public PolicyHolderRequest getHolderWithAddons(@PathVariable int policyHolderId) {
        return holderService.getHolderWithAddons(policyHolderId);
    }
    /*
     * Aim : Approve the Policy by Officer (Payment should complete before approve policy)
     * Path : api/policy-holder/approve
     * Method : PUT
     * Input : PolicyHolder
     * Response : PolicyHolder
     * 
     * */
    
    @PutMapping("/approve")
    public ResponseEntity<PolicyHolder> approvePolicy(@RequestParam int policyHolderId) {
        PolicyHolder updatedHolder = holderService.approvePolicy(policyHolderId);
        return ResponseEntity.ok(updatedHolder);
    }
    
    
    /*
     * Aim : Deactivate the policy
     * Path : api/policy-holder/deactivate
     * Method : PUT
     * Input : PolicyHolder
     * Response : PolicyHolder
     * 
     * */
    
    @PutMapping("/deactivate")
    public ResponseEntity<PolicyHolder> deactivatePolicy(@RequestParam int policyHolderId) {
        PolicyHolder updatedHolder = holderService.deactivatePolicy(policyHolderId);
        return ResponseEntity.ok(updatedHolder);
    }
}
