package com.springboot.vehicleInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.model.Document;
import com.springboot.vehicleInsurance.service.DocumentService;

@RestController
@RequestMapping("api/document")
public class DocumentController {
	
	@Autowired
	private DocumentService documentService;
	
	/*
	 * Aim : To insert Document for the PolicyHolder
	 * Path : api/document/upload
	 * Method : POST
	 * Input : PolicyHolderId
	 * Response : Document
	 * 
	 * */
	
	@PostMapping("/upload")
	public Document uploadDocument(@RequestParam int policyHolderId, @RequestBody Document document) {
		
		return documentService.uploadDocument(policyHolderId, document);
	}

}
