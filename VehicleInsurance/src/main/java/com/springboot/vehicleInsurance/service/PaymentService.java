package com.springboot.vehicleInsurance.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.vehicleInsurance.exception.InsufficientPaymentException;
import com.springboot.vehicleInsurance.exception.PolicyHolderNotFoundException;
import com.springboot.vehicleInsurance.exception.QuoteNotFoundException;
import com.springboot.vehicleInsurance.model.Payment;
import com.springboot.vehicleInsurance.model.PolicyHolder;
import com.springboot.vehicleInsurance.model.Quote;
import com.springboot.vehicleInsurance.repository.PaymentRepository;
import com.springboot.vehicleInsurance.repository.PolicyHolderRepository;

@Service
public class PaymentService {
	 
	private PaymentRepository paymentRepository;
	private QuoteService quoteService;
	private PolicyHolderRepository holderRepository;
	
	

	public PaymentService(PaymentRepository paymentRepository, QuoteService quoteService,
			PolicyHolderRepository holderRepository) {
		super();
		this.paymentRepository = paymentRepository;
		this.quoteService = quoteService;
		this.holderRepository = holderRepository;
	}



	public Payment pay(int policyHolderId, Payment payment) {
		PolicyHolder holder = holderRepository.findById(policyHolderId)
				.orElseThrow(()-> new PolicyHolderNotFoundException("Policy Holder not found"));
		
		Quote quote = quoteService.getQuote(policyHolderId);
		if(quote == null) {
			throw new QuoteNotFoundException("Quote Not Found.. Please check the policyHolderId");
		}
		payment.setStatus("PAID");
		payment.setPaidDate(LocalDate.now());
		holder.setStatus("PAID"); 
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



	public List<Payment> getAllPayment() {
		
		return paymentRepository.findAll();
	}

}
