package com.ecom.Service;

import java.util.List;

import com.ecom.Dao.ProductDao;
import com.ecom.Dao.Impl.ProductDaoImpl;
import com.ecom.exception.InvalidIdException;
import com.ecom.exception.InvalidInputException;
import com.ecom.model.Category;
import com.ecom.model.Product;

public class ProductService {
	ProductDao productdao=new ProductDaoImpl();
	public void insert(Product product) throws InvalidInputException {
		if(product == null ) throw new InvalidInputException("Product should not be null");
		productdao.insert(product);	
	}
	public List<Product> getAll(){
		return productdao.getAll();
	}
	public List<Product> getByCategoryId(int categoryID,Product product) throws InvalidIdException{
		if(categoryID < 0) throw new InvalidIdException("Category id should not be negative");
		if(product == null ) throw new RuntimeException("Product should not be null");
		return productdao.getByCategoryId(categoryID,product);
		
	}
	public Product getById(int product_id) throws InvalidIdException{
		
		return productdao.getById(product_id);
	}

}
