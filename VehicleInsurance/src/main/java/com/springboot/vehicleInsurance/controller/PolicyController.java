package com.springboot.vehicleInsurance.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.EPolicy;
import com.springboot.vehicleInsurance.service.PolicyService;

@RestController
@RequestMapping("api/policy")
@CrossOrigin(origins = "http://localhost:5173")
public class PolicyController {

	@Autowired
	private PolicyService policyService;

	/*
	 * Aim : To add new Policy in DB
	 * Path : localhost:8080/api/policy/add
	 * Method : Post
	 * Response : Policy
	 * Input : new policy
	 */

	@PostMapping("/add")
	public EPolicy add(@RequestBody EPolicy policy) {
		return policyService.add(policy);
	}

	/*
	 * Aim : Fetch Policy by Policy id
	 * Path : localhost:8080/api/policy/get-one/{policyId}
	 * Method : GET
	 * Response : Policy
	 * Input : policyId
	 */

	@GetMapping("/get-one/{policyId}")
	public EPolicy getPolicyById(@PathVariable int policyId) {
		return policyService.getPolicyById(policyId);
	}

	/*
	 * Aim : Fetch All Policy
	 * Path : localhost:8080/api/policy/get-all
	 * Method : GET
	 * Response : List<Policy>
	 * 
	 */

	@GetMapping("/get-all")
	public ResponseEntity<?> getAll(@RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(name = "size", required = false, defaultValue = "100000") Integer size) {

		return ResponseEntity.status(HttpStatus.OK).body(policyService.getAll(page, size));

	}

	@GetMapping("/get-all-v2")
	public List<EPolicy> getAllV2() {

		return policyService.getAllV2();

	}

	 @PutMapping("update/{policyId}")
	    public EPolicy updateEPolicy(@PathVariable int policyId, @RequestBody EPolicy policy) {
	        return policyService.updatePolicy(policyId, policy);
	    }

	    @DeleteMapping("delete/{policyId}")
	    public ResponseEntity<?> deleteEPolicy(@PathVariable int policyId) {
	        policyService.deletePolicy(policyId);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Policy Deleted Successfully");
	    }
}
