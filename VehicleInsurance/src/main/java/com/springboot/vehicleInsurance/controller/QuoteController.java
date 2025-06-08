package com.springboot.vehicleInsurance.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.vehicleInsurance.dto.QuoteWithAddOnsDto;
import com.springboot.vehicleInsurance.model.Quote;
import com.springboot.vehicleInsurance.service.QuoteService;

@RestController
@RequestMapping("api/quote")
public class QuoteController {
	
	@Autowired
	private QuoteService quoteService;
	
	/*
	 * Aim : To post Quote for the policy to holder
	 * Path : api/quote/send/{policyHolderId}
	 * Method : Post
	 * Input : policyHolderId
	 * Response : Quote
	 * 
	 * */
	
	@PostMapping("/send/{policyHolderId}")
	public Quote send(@PathVariable int policyHolderId, Quote quote) {
		return quoteService.send(policyHolderId, quote);
	}
	
	/*
	 * Aim : To get the Quote by policyHolder id
	 * Path : api/quote/get-on/{policyHolderId}
	 * Method : Get
	 * Input : policyHolderId
	 * Response : Quote
	 * 
	 * */
	
	@GetMapping("/get-one/{policyHolderId}")
	public Quote getQuote(@PathVariable int policyHolderId) {
		return quoteService.getQuote(policyHolderId);
	}
	
	/*
	 * Aim : TO get the Quote with Addons by policyHolderId
	 * Path : api/quote/get-addons
	 * Method : Get
	 * Input : username
	 * Response: QuoteWithAddOns
	 * */
	
	@GetMapping("/get-addons")
	public QuoteWithAddOnsDto getQuoteWithAddOns(@RequestParam int policyHolderId, QuoteWithAddOnsDto addOnsDto ) {

		return quoteService.getQuoteWithAddOns(policyHolderId, addOnsDto);
	}
	
	
}
