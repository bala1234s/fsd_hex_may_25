package com.ecom.Dao;

import java.util.List;

import com.ecom.exception.InvalidIdException;
import com.ecom.exception.InvalidInputException;
import com.ecom.model.Customer;

public interface CustomerDao {
 void insert(Customer customer) throws InvalidInputException;
 List<Customer>getAll();
 Customer getByID(int id) throws InvalidIdException;

}
