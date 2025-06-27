package com.springboot.vehicleInsurance.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.vehicleInsurance.exception.ClaimNotFoundException;
import com.springboot.vehicleInsurance.exception.PolicyHolderNotFoundException;
import com.springboot.vehicleInsurance.model.Claim;
import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.model.PolicyHolder;
import com.springboot.vehicleInsurance.repository.ClaimRepository;
import com.springboot.vehicleInsurance.repository.PolicyHolderRepository;

@Service
public class ClaimService {

	private ClaimRepository claimRepository;
	private PolicyHolderRepository holderRepository;
	
	


	public ClaimService(ClaimRepository claimRepository, PolicyHolderRepository holderRepository) {
		super();
		this.claimRepository = claimRepository;
		this.holderRepository = holderRepository;
	}




	public Claim claimRequest(int policyHolderId, Claim claim) {
		// get policy holder by id
		PolicyHolder policyHolder = holderRepository.findById(policyHolderId)
				.orElseThrow(()-> new PolicyHolderNotFoundException("Policy Holder Id is Invalid!!!"));
		
		// set policy holder in Claim
		claim.setPolicyHolder(policyHolder);
		
		// set status as PENDING
		claim.setStatus("PENDING");
		
		// set applied date 
		claim.setAppliedDate(LocalDate.now());
		
		return claimRepository.save(claim);
	}




	public Claim getClaimByPolicyHolderId(String username) {
		PolicyHolder policyHolder = holderRepository.getPolicyHolderByUsername(username);
		if(policyHolder == null) {
			throw new PolicyHolderNotFoundException("Policy Holder Id is Invalid!!!");
		}
		int policyHolderId = policyHolder.getId();
		return claimRepository.getClaimByPolicyHolderId(policyHolderId);
	}




	public List<Claim> getAllClaim() {
		
		return claimRepository.findAll();
	}




	public Claim approveClaim(int policyHolderId) {
		
		// Get Policy Holder by Id
		PolicyHolder policyHolder = holderRepository.findById(policyHolderId)
				.orElseThrow(()-> new PolicyHolderNotFoundException("Policy Holder Not Found"));
		// Get Claim by Policy Holder Id
		Claim claim = claimRepository.getClaimByPolicyHolderId(policyHolderId);
		if(claim == null) {
			throw new ClaimNotFoundException("Policy Holder is not apply Claim");
		}
		
		
		// Set Approved Date
		claim.setApprovedDate(LocalDate.now());
		// Set status APPROVED
		claim.setStatus("APPROVED");
		// Set Policy Holder Status CLAIMED
		policyHolder.setStatus("CLAIMED");;
		
		// Put Claim in DB
		return claimRepository.save(claim);
	}




	public Claim uploadDamagedPic(MultipartFile file, int policyHolderId) throws IOException {
		Claim claim = claimRepository.getClaimByPolicyHolderId(policyHolderId);
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

	    String uploadPath = "D:\\Hexaware\\Phase 3\\Springboot\\Case Study\\VehicleInsurance-UI\\public\\ClaimImages";
	    Files.createDirectories(Path.of(uploadPath));
	    Path path = Paths.get(uploadPath, originalFileName);
	    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

	    claim.setImage(originalFileName);
	    return claimRepository.save(claim);
		
	}

}
