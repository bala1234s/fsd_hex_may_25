package com.springboot.vehicleInsurance;

import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.repository.CustomerRepository;
import com.springboot.vehicleInsurance.service.CustomerService;

@SpringBootTest
public class CustomerServiceTest {
	
	@InjectMocks
	private CustomerService customerService;
	@Mock
	private CustomerRepository customerRepository;
	
	private Customer customer;
	
	@BeforeEach
    public void init() {
        customer = new Customer();
        customer.setId(1);
        customer.setName("John Doe");
        customer.setDOB(LocalDate.of(2000, 1, 1));
        customer.setAddress("Chennai");
        customer.setAadharNumber("123456789012");
        customer.setPanNumber("ABCDE1234F");
        System.out.println("Customer object initialized");
    }

    @Test
    public void getById_ValidId_ReturnsCustomer() {
        when(customerRepository.findById(1)).thenReturn(Optional.of(customer));

        Customer result = customerService.getById(1);

        assertEquals(customer, result);
    }

	
	public void afterEach() {
		customer = null;
		System.out.println("Customer is null");
		
	}
	
}
