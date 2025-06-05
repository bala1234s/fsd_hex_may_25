package com.springboot.vehicleInsurance.dto;

import java.util.List;

import com.springboot.vehicleInsurance.model.AddOns;
import com.springboot.vehicleInsurance.model.Quote;


public class QuoteGenarationDto {
	
	private Quote quote;
	private List<AddOns> addOns;
	
	
	public Quote getQuote() {
		return quote;
	}
	public void setQuote(Quote quote) {
		this.quote = quote;
	}
	public List<AddOns> getAddOns() {
		return addOns;
	}
	public void setAddOns(List<AddOns> addOns) {
		this.addOns = addOns;
	}
	
	

}
