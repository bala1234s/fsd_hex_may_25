package com.ecom.Service;

import java.util.List;

import com.ecom.Dao.CategoryDao;
import com.ecom.Dao.Impl.CategoryDaoImpl;
import com.ecom.exception.InvalidInputException;
import com.ecom.model.Category;

public class CategoryService {
	CategoryDao categorydao = new CategoryDaoImpl();
	
	public void insert(Category category) throws InvalidInputException{
		if(category == null) {
			throw new InvalidInputException("Category should not be null");
		}
		categorydao.insert(category);
		
	}
	public List<Category> getAll(){
		return categorydao.getAll();
	}
	

}
