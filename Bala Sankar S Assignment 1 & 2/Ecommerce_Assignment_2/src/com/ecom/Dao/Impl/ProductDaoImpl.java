package com.ecom.Dao.Impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ecom.Dao.ProductDao;
import com.ecom.Util.DBUtility;
import com.ecom.exception.InvalidIdException;
import com.ecom.model.Category;
import com.ecom.model.Customer;
import com.ecom.model.Product;

public class ProductDaoImpl implements ProductDao{
DBUtility db =DBUtility.getInstance();
	@Override
	public void insert(Product product) {
		
		    Connection con=db.connect();
		    String query="INSERT into product values(?,?,?,?)";
		    try {
				PreparedStatement stms= con.prepareStatement(query);
				//prepare the sql statement
				int id = (int) (Math.random()*1000000);
				stms.setInt(1,id);
				stms.setString(2,product.getName() );
				// set the 3nd value in the sql statement to name from product
				stms.setDouble(3,product.getPrice());
				// set the 3rd value  in the sql statement to categoryid from product
				stms.setInt(4, product.getCategory_id());
			
				stms.executeUpdate();
			} catch (SQLException e) {
				System.out.println(e.getMessage());
			}
		
	}
	@Override
	public List<Product> getAll() {
		Connection con=db.connect();
		List<Product> list= new ArrayList<>();
		// create list and store the customer info so as to display
	    String query="select * from product";
	    try {
			PreparedStatement stms= con.prepareStatement(query);
			ResultSet rs =stms.executeQuery();
			// creating result set to display all the rows one by one
			while(rs.next()){
				Product product = new Product();
				product.setId(rs.getInt("id"));
				product.setName(rs.getString("name"));
				product.setPrice(rs.getDouble("price"));
				product.setCategory_id(rs.getInt("category_id"));
				list.add(product);
			}
			
	    }catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return list;
	}
	@Override
	public List<Product> getByCategoryId(int category_id,Product product) throws InvalidIdException  {
		List<Product> list = new ArrayList<>();
		Connection con = db.connect();
		String sql="select * from product where category_id=?";
		try {
			PreparedStatement pstmt = con.prepareStatement(sql);
			pstmt.setInt(1, category_id);
			
			ResultSet rst=  pstmt.executeQuery();
			if(rst.next() == true) {
				Product product1 = new Product();
				product1.setId(rst.getInt("id"));
				product1.setName(rst.getString("name"));
				product1.setPrice(rst.getDouble("price"));
				product1.setCategory_id(rst.getInt("category_id"));
				list.add(product1);
				return  list; 
			}
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());

		}
		db.close();
		throw new InvalidIdException("Category ID given is Invalid");
	}
	@Override
	public Product getById(int product_id) throws InvalidIdException {
	    Connection con = db.connect();
	    
	    // Join category table to get category name as well
	    String sql = "SELECT p.*, c.id AS cat_id, c.name AS cat_name FROM product p "
	               + "JOIN category c ON p.category_id = c.id WHERE p.id = ?";
	    try {
	        PreparedStatement pstmt = con.prepareStatement(sql);
	        pstmt.setInt(1, product_id);
	        
	        ResultSet rst = pstmt.executeQuery();
	        if (rst.next()) {
	            Product product = new Product();
	            product.setId(rst.getInt("id"));
	            product.setName(rst.getString("name"));
	            product.setPrice(rst.getDouble("price"));
	            product.setCategory_id(rst.getInt("category_id"));
	            
	            // Set Category object inside Product
	            Category category = new Category();
	            category.setId(rst.getInt("cat_id"));
	            category.setName(rst.getString("cat_name"));
	            product.setCategory(category);
	            
	            return product;
	        }
	    } catch (SQLException e) {
	        System.out.println(e.getMessage());
	    } finally {
	        db.close();
	    }
	    
	    throw new InvalidIdException("Product ID given is Invalid");
	}


	

}
