package com.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ecom.Service.CustomerService;
import com.ecom.exception.InvalidIdException;
import com.ecom.exception.InvalidInputException;
import com.ecom.model.Customer;

public class CustomerServiceTest {

    private CustomerService customerService;

    @BeforeEach
    public void init() {
        customerService = new CustomerService();
    }

    @Test
    public void testInsertCustomer() {
        // Use Case 1: Insert valid customer (should not throw exception)
        Customer customer = new Customer(1, "John Doe", "New York", "1234567890", "john@example.com");
        assertDoesNotThrow(() -> customerService.insert(customer));

        // Use Case 2: Insert null customer (should throw InvalidInputException)
        InvalidInputException exception = assertThrows(InvalidInputException.class, () -> {
            customerService.insert(null);
        });
        assertEquals("Customer should not be null", exception.getMessage());
    }

    @Test
    public void testGetAllCustomers() {
        // Use Case 3: Get all customers - should return a non-null list
        List<Customer> customers = customerService.getAll();
        assertNotNull(customers);
    }

    @Test
    public void testGetCustomerById() {
        // Use Case 4: Get customer by valid ID - should not throw exception
        assertDoesNotThrow(() -> customerService.getById(1));

        // Use Case 5: Get customer by negative ID - should throw InvalidIdException
        InvalidIdException exception = assertThrows(InvalidIdException.class, () -> {
            customerService.getById(-5);
        });
        assertEquals("Id should not be negative", exception.getMessage());
    }
}
