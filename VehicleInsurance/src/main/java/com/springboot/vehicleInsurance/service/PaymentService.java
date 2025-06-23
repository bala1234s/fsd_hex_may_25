package com.springboot.vehicleInsurance.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.exception.InsufficientPaymentException;
import com.springboot.vehicleInsurance.exception.QuoteNotFoundException;
import com.springboot.vehicleInsurance.model.Payment;
import com.springboot.vehicleInsurance.model.Quote;
import com.springboot.vehicleInsurance.repository.PaymentRepository;

@Service
public class PaymentService {
	 
	private PaymentRepository paymentRepository;
	private QuoteService quoteService;
	
	
	
	public PaymentService(PaymentRepository paymentRepository, QuoteService quoteService) {
		super();
		this.paymentRepository = paymentRepository;
		this.quoteService = quoteService;
	}



	public Payment pay(int policyHolderId, Payment payment) {
		
		Quote quote = quoteService.getQuote(policyHolderId);
		if(quote == null) {
			throw new QuoteNotFoundException("Quote Not Found.. Please check the policyHolderId");
		}
		payment.setStatus("PAID");
		payment.setPaidDate(LocalDate.now());
		System.out.println(payment.getPaid());
		if(payment.getPaid() != quote.getTotal()) {
			throw new InsufficientPaymentException("Please Enter Proper Amount !!!");
		}
		payment.setQuote(quote);
		return paymentRepository.save(payment);
	}



	public Payment getPaymentByHolderId(int policyHolderId) {
		
		return paymentRepository.getPaymentByHolderId(policyHolderId);
	}

}
