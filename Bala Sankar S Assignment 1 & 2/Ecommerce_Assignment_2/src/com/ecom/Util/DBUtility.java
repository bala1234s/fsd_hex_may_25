package com.ecom.Util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtility {
	private String url="jdbc:mysql://localhost:3306/ecommerce_db";
	private String user ="root";
	private String pass= "root123";
	
	private static String driver = "com.mysql.cj.jdbc.Driver";
	
	private Connection con;
	private static DBUtility db = new DBUtility();
	
	private DBUtility(){	}
	
	public static DBUtility getInstance() {
		return db;
	
	}
	
	
	public  Connection connect() {
		try {
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			System.out.println(e.getMessage());
		}
		try {
			con =  DriverManager.getConnection(url, user, pass);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return con;
	}
	public void close() {
		try {
			if(!con.isClosed())
				con.close();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
	}
	
}
