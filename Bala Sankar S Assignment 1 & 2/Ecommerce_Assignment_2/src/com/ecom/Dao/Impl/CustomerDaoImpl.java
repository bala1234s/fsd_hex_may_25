package com.ecom.Dao.Impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ecom.Dao.CustomerDao;
import com.ecom.Util.DBUtility;
import com.ecom.exception.InvalidIdException;
import com.ecom.model.Customer;
import com.ecom.model.Product;

public class CustomerDaoImpl implements CustomerDao {
DBUtility db =DBUtility.getInstance();
	@Override
	public void insert(Customer customer){
    Connection con=db.connect();
    String query="INSERT into customer values(?,?,?,?,?)";
    try {
		PreparedStatement stms= con.prepareStatement(query);
		//prepare the sql statement
		int id = (int) (Math.random()*1000000);
		stms.setInt(1,id);
		stms.setString(2,customer.getName() );
		// set the 3nd value in the sql statement to name from customer
		stms.setString(3,customer.getCity());
		// set the 3rd value  in the sql statement to city from customer
		stms.setString(4, customer.getMobile());
		// set the 3th value  in the sql statement to mobile from customer
		stms.setString(5, customer.getEmail());
		//set the  5th value in the sql  statement to email from customer
		stms.executeUpdate();
	} catch (SQLException e) {
		System.out.println(e.getMessage());
	}
		
	}

	@Override
	public List<Customer> getAll() {
		Connection con=db.connect();
		List<Customer> list= new ArrayList<>();
		// create list and store the customer info so as to display
	    String query="select * from customer";
	    try {
			PreparedStatement stms= con.prepareStatement(query);
			ResultSet rs =stms.executeQuery();
			// creating result set to display all the rows one by one
			while(rs.next()){
				Customer customer = new Customer();
				customer.setId(rs.getInt("id"));
				customer.setName(rs.getString("name"));
				customer.setCity(rs.getString("city"));
				customer.setMobile(rs.getString("mobile"));
				customer.setEmail(rs.getString("email"));
				list.add(customer);
			}
			
	    }catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return list;
	}

	@Override
	public Customer getByID(int id) throws InvalidIdException {
		List<Customer> list = new ArrayList<>();
		Connection con = db.connect();
		String sql="select * from customer where id=?";
		try {
			PreparedStatement pstmt = con.prepareStatement(sql);
			pstmt.setInt(1, id);
			
			ResultSet rst=  pstmt.executeQuery();
			if(rst.next() == true) {
				Customer customer= new Customer();
				customer.setId(rst.getInt("id"));
				customer.setName(rst.getString("name"));
				customer.setCity(rst.getString("city"));
				customer.setMobile(rst.getString("mobile"));
				customer.setEmail(rst.getString("email"));
				
				list.add(customer);
				return  customer; 
			}
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());

		}
		db.close();
		throw new InvalidIdException("Customer ID given is Invalid");
	}

}
