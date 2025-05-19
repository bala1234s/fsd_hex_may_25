package com.ecom.Dao;


import java.util.List;

import com.ecom.exception.InvalidInputException;
import com.ecom.model.Category;

public interface CategoryDao {
void insert(Category category) throws InvalidInputException;
List<Category> getAll();
}
