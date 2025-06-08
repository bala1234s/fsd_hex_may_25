package com.springboot.vehicleInsurance;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;

import com.springboot.vehicleInsurance.model.Review;
import com.springboot.vehicleInsurance.service.ReviewService;

@SpringBootTest
public class ReviewServiceTest {
	
	@InjectMocks
	private ReviewService reviewService;
	
	private Review review;
	
	@BeforeEach
	public void init() {
		
		review = new Review();
		review.setId(1);
		review.setComments("Good");
		review.setRating(4);
		
	}
	
	@Test
	public void addReviewTest() {
		
		when(reviewService.addReview(1, 1, review)).thenReturn(review);
		
		Review actualReview = reviewService.addReview(1, 1, review);
		
		Review expectedReview = review;
		
		Assertions.assertEquals(expectedReview, actualReview);
		
		
		
	}
	
	
}
