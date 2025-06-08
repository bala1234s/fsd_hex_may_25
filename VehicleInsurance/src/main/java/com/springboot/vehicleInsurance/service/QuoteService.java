package com.springboot.vehicleInsurance.service;

import java.time.LocalDate;
import java.util.List;
import com.springboot.vehicleInsurance.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.dto.QuoteWithAddOnsDto;
import com.springboot.vehicleInsurance.exception.PolicyHolderNotFoundException;
import com.springboot.vehicleInsurance.exception.QuoteNotFoundException;
import com.springboot.vehicleInsurance.model.AddOns;
import com.springboot.vehicleInsurance.model.PolicyHolder;
import com.springboot.vehicleInsurance.model.Quote;
import com.springboot.vehicleInsurance.repository.PolicyHolderRepository;
import com.springboot.vehicleInsurance.repository.QuoteRepository;

@Service
public class QuoteService {

    


	
	private QuoteRepository quoteRepository;
	private PolicyHolderRepository holderRepository;
	private AddOnService addOnService;
	
	public QuoteService(QuoteRepository quoteRepository, PolicyHolderRepository holderRepository,
			AddOnService addOnService, ReviewRepository reviewRepository) {
		super();
		this.quoteRepository = quoteRepository;
		this.holderRepository = holderRepository;
		this.addOnService = addOnService;
	}




	public Quote send(int policyHolderId, Quote quote) {
		PolicyHolder holder = holderRepository.findById(policyHolderId)
				.orElseThrow(()-> new PolicyHolderNotFoundException("Policy Holder not found"));
		
		List<AddOns> addons = addOnService.getByPolicyHolderId(policyHolderId);
		
		double premium = holder.getPolicy().getPrice();
		double addOnPrice = 0.0;
		for (AddOns addon : addons) {
		    addOnPrice += addon.getPrice();
		}
		double total = premium + addOnPrice;
		holder.setStatus("QUOTE GENARATED");
		quote.setPremium(premium);
		quote.setAddOnPrice(addOnPrice);
		quote.setTotal(total);
		quote.setPolicyHolder(holder);
		quote.setSendDate(LocalDate.now());
		return quoteRepository.save(quote);
	}


	public Quote getQuote(int policyHolderId) {
		
		return quoteRepository.getQuoteByHolderId(policyHolderId);
	}




	public QuoteWithAddOnsDto getQuoteWithAddOns( int policyHolderId, QuoteWithAddOnsDto addOnsDto) {
		
		
		// Get Quote By policyHolder
		Quote quote = getQuote(policyHolderId);
		if(quote == null) {
			throw new QuoteNotFoundException("Quote Not Found");
		}
		
		// Get Addons by PolicyHolderID
		List<AddOns> addOns = addOnService.getByPolicyHolderId(policyHolderId);
		if(addOns == null) {
			addOnsDto.setAddOns(null);
		}
		//Set Quote in DTO
		addOnsDto.setQuote(quote);
		// Set Addons List in DTO
		addOnsDto.setAddOns(addOns);
		
		// Return DTO
		return addOnsDto;
	}

}
