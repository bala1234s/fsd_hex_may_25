package com.springboot.vehicleInsurance;

import static org.mockito.Mockito.when;

import java.time.LocalDate;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;

import com.springboot.vehicleInsurance.model.Claim;
import com.springboot.vehicleInsurance.service.ClaimService;

@SpringBootTest
public class ClaimServiceTest {
	
	@InjectMocks
	private ClaimService claimService;
	
	private Claim claim;
	
	@BeforeEach
	public void init() {
		claim = new Claim();
		claim.setId(1);
		claim.setAppliedDate(LocalDate.now());
		claim.setApprovedDate(null);
		claim.setDescription("New Claim");
		claim.setImage("Image.jpg");
		claim.setStatus("PENDING");
		
	}
	
	@Test
	public void claimRequestTest() {
		
		
		when(claimService.claimRequest(1, claim)).thenReturn(claim);
		Claim actual = claimService.claimRequest(1, claim);
		Claim expected = claim;
		
		Assertions.assertEquals(expected, actual);
	}
	
	

}
