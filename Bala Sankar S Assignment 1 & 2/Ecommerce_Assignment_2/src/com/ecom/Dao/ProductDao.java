package com.ecom.Dao;

import java.util.List;

import com.ecom.exception.InvalidIdException;
import com.ecom.exception.InvalidInputException;
import com.ecom.model.Product;

public interface ProductDao {
void insert(Product product) throws InvalidInputException ;
List<Product>  getAll() ;
List<Product> getByCategoryId(int category_id,Product product) throws InvalidIdException;
Product getById(int product_id) throws InvalidIdException;

}
