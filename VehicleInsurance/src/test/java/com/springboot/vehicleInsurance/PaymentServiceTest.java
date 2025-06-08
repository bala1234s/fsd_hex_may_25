package com.springboot.vehicleInsurance;

import static org.mockito.Mockito.when;


import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.springboot.vehicleInsurance.model.Payment;
import com.springboot.vehicleInsurance.model.Quote;
import com.springboot.vehicleInsurance.repository.PaymentRepository;
import com.springboot.vehicleInsurance.service.PaymentService;

@SpringBootTest
public class PaymentServiceTest {
	
	
	@InjectMocks
	private PaymentService paymentService;
	@Mock
	private PaymentRepository paymentRepository;
	
	private Payment payment;
	private Quote quote;
	
	public void init() {
		payment = new Payment();
		payment.setId(1);
		payment.setPaid(1200);
		
		
		
		quote = new Quote();
		quote.setId(1);
		quote.setAddOnPrice(200);
		quote.setPremium(1000);
		payment.setQuote(quote);
		
		
	}
	
	@Test
	public void getPaymentTest() {
		
		Payment payment = new Payment();
		payment.setId(1);
		payment.setPaid(1200);
		
	
		
		when(paymentRepository.findById(1)).thenReturn(Optional.of(payment));
		Payment expected = payment;
		Payment actual = paymentRepository.findById(1).orElseThrow();
		
		Assertions.assertEquals(expected, actual);
		
		
	}
	
	
	@AfterEach
	public void close() {
		payment = null;
		quote = null;
	}

}
