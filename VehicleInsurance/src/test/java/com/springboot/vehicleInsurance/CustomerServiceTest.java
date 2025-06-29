package com.springboot.vehicleInsurance;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import com.springboot.vehicleInsurance.model.Customer;
import com.springboot.vehicleInsurance.repository.CustomerRepository;
import com.springboot.vehicleInsurance.service.CustomerService;
import com.springboot.vehicleInsurance.exception.CustomerNotFoundException;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

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
        customer.setdob(LocalDate.of(2000, 1, 1));
        customer.setAddress("Chennai");
        customer.setAadharNumber("123456789012");
        customer.setPanNumber("ABCDE1234F");
        System.out.println("Customer object initialized");
    }

    @Test
    public void getCustomerTest() {
        when(customerRepository.findById(1)).thenReturn(Optional.of(customer));

        Customer result = customerService.getById(1);

        assertEquals(customer, result);
    }

    @Test
    public void checkCustomerNotFound() {
        int invalidId = 99;

        when(customerRepository.findById(invalidId)).thenReturn(Optional.empty());

        assertThrows(CustomerNotFoundException.class, () -> {
            customerService.getById(invalidId);
        });
    }

    @AfterEach
    public void afterEach() {
        customer = null;
        System.out.println("Customer is null");
    }
}
