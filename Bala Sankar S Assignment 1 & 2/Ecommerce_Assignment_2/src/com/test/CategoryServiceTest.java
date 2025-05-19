package com.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ecom.Service.CategoryService;
import com.ecom.exception.InvalidInputException;
import com.ecom.model.Category;

public class CategoryServiceTest {
    CategoryService categoryService;

    @BeforeEach
    public void init() {
        categoryService = new CategoryService();
    }

    @Test
    public void testInsertCategory() {
        // Use Case 1: Insert valid category (no exception expected)
        Category category = new Category(1, "Electronics");
        assertDoesNotThrow(() -> categoryService.insert(category));
        
        // Use Case 2: Insert null category (should throw InvalidInputException)
        InvalidInputException ex = assertThrows(InvalidInputException.class, () -> {
            categoryService.insert(null);
        });
        assertEquals("Category should not be null", ex.getMessage());
    }

    @Test
    public void testGetAll() {
        // Use Case 3: Get all categories - should return non-null list
        List<Category> categories = categoryService.getAll();
        assertNotNull(categories);
    }
}
