package com.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ecom.Service.ProductService;
import com.ecom.exception.InvalidIdException;
import com.ecom.exception.InvalidInputException;
import com.ecom.model.Category;
import com.ecom.model.Product;

public class ProductServiceTest {

    private ProductService productService;

    @BeforeEach
    public void init() {
        productService = new ProductService();
    }

    @Test
    public void testInsertProduct() {
        // Use Case 1: Insert valid product - should not throw exception
        Category category = new Category(1, "Electronics");
        Product product = new Product(101, "Smartphone", 15000.0, category.getId(), category);
        assertDoesNotThrow(() -> productService.insert(product));

        // Use Case 2: Insert null product - should throw InvalidInputException
        InvalidInputException ex = assertThrows(InvalidInputException.class, () -> {
            productService.insert(null);
        });
        assertEquals("Product should not be null", ex.getMessage());
    }

    @Test
    public void testGetAllProducts() {
        // Use Case 3: Get all products - should return a non-null list
        List<Product> products = productService.getAll();
        assertNotNull(products);
    }

    @Test
    public void testGetByCategoryId() {
        // Use Case 4: Valid category ID and product - should not throw
        Category category = new Category(2, "Appliances");
        Product product = new Product(102, "Washing Machine", 25000.0, category.getId(), category);
        assertDoesNotThrow(() -> productService.getByCategoryId(category.getId(), product));

        // Use Case 5: Negative category ID - should throw InvalidIdException
        Product product2 = new Product(103, "Chair", 2000.0, -1, category);
        InvalidIdException ex = assertThrows(InvalidIdException.class, () -> {
            productService.getByCategoryId(-1, product2);
        });
        assertEquals("Category id should not be negative", ex.getMessage());

        // Use Case 6: Null product for category ID - should throw RuntimeException
        assertThrows(RuntimeException.class, () -> {
            productService.getByCategoryId(1, null);
        });
    }

    @Test
    public void testGetById() {
        // Use Case 7: Valid product ID - should not throw exception
        assertDoesNotThrow(() -> productService.getById(1));

        // Use Case 8: Negative product ID - should throw InvalidIdException
        assertThrows(InvalidIdException.class, () -> productService.getById(-10));
    }
}
