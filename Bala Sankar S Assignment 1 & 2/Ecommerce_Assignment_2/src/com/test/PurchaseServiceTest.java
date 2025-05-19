package com.test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Scanner;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ecom.Service.PurchaseService;
import com.ecom.exception.InvalidIdException;

public class PurchaseServiceTest {

    private PurchaseService purchaseService;

    @BeforeEach
    public void init() {
        purchaseService = new PurchaseService();
    }

    @Test
    public void purchaseTest() {
        // Use Case 1: Valid customer and product ID, user inputs Y + valid coupon
        System.out.println("Use Case 1: Enter 'Y' then Type 'DIWALI'.");
        
        assertDoesNotThrow(() -> {
            purchaseService.purchase(1, 1, new Scanner(System.in));
        });

        // Use Case 2: Invalid customer ID
        System.out.println("Use Case 2: Invalid customer ID - should throw InvalidIdException.");
        assertThrows(InvalidIdException.class, () -> {
            purchaseService.purchase(-1, 1, new Scanner(System.in));
        });

        // Use Case 3: Invalid product ID
        System.out.println("Use Case 3: Invalid product ID - should throw InvalidIdException.");
        assertThrows(InvalidIdException.class, () -> {
            purchaseService.purchase(1, -5, new Scanner(System.in));
        });

        // Use Case 4: Valid IDs, user enters 'N' for coupon
        System.out.println("Use Case 4: Enter 'N' ");
        assertDoesNotThrow(() -> {
            purchaseService.purchase(1, 1, new Scanner(System.in));
        });
    }
}
