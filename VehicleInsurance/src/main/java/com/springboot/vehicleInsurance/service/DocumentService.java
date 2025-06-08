package com.springboot.vehicleInsurance.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.exception.PolicyHolderNotFoundException;
import com.springboot.vehicleInsurance.model.Document;
import com.springboot.vehicleInsurance.model.PolicyHolder;
import com.springboot.vehicleInsurance.repository.DocumentRepository;
import com.springboot.vehicleInsurance.repository.PolicyHolderRepository;

@Service
public class DocumentService {
	
	private DocumentRepository documentRepository;
	private PolicyHolderRepository holderRepository;
	
	
	public DocumentService(DocumentRepository documentRepository, PolicyHolderRepository holderRepository) {
		super();
		this.documentRepository = documentRepository;
		this.holderRepository = holderRepository;
	}



	public Document uploadDocument(int policyHolderId, Document document) {
		// Get policyHolder by id
		PolicyHolder policyHolder = holderRepository.findById(policyHolderId)
				.orElseThrow(()-> new PolicyHolderNotFoundException("Policy Holder Not Found!!!"));
		
		// set Policy holder in Document
		document.setPolicyHolder(policyHolder);
		
		//set uploadDate
		document.setUploadDate(LocalDate.now());
		
		return documentRepository.save(document);
	}

}
