package com.ecom.Dao.Impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ecom.Dao.CategoryDao;
import com.ecom.Util.DBUtility;
import com.ecom.exception.InvalidIdException;
import com.ecom.model.Category;
import com.ecom.model.Customer;

public class CategoryDaoImpl  implements CategoryDao{
DBUtility db =DBUtility.getInstance();
	@Override
	public void insert(Category category) {
		Connection con=db.connect();
	    String query="INSERT into category values(?,?)";
	    try {
			PreparedStatement stms= con.prepareStatement(query);
			//prepare the sql statement
			 int id = (int) (Math.random()*1000000);
			stms.setInt(1,id);
			stms.setString(2,category.getName() );
			
			stms.executeUpdate();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		
	}
	@Override
	public List<Category> getAll() {
		Connection con=db.connect();
		List<Category> list= new ArrayList<>();
		// create list and store the customer info so as to display
	    String query="select * from category";
	    try {
			PreparedStatement stms= con.prepareStatement(query);
			ResultSet rs =stms.executeQuery();
			// creating result set to display all the rows one by one
			while(rs.next()){
				Category category = new Category();
				category.setId(rs.getInt("id"));
				category.setName(rs.getString("name"));
			
				list.add(category);
			}
			
	    }catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return list;
	}

}
