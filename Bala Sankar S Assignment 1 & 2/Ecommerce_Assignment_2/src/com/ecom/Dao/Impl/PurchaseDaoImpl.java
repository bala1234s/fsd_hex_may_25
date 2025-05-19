package com.ecom.Dao.Impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

import com.ecom.Dao.PurchaseDao;
import com.ecom.Util.DBUtility;
import com.ecom.model.Purchase;

public class PurchaseDaoImpl implements PurchaseDao{
	
	DBUtility db=DBUtility.getInstance();
	
	@Override
	public void insert(Purchase purchase) {
		Connection con = db.connect();
		String sql = "INSERT INTO purchase (id, customer_id, product_id, category_id, coupon, purchase_date, amount10_paid) VALUES (?, ?, ?, ?, ?, ?, ?)";
	
		try (PreparedStatement pstmt = con.prepareStatement(sql)) {
			pstmt.setInt(1, purchase.getId());
			pstmt.setInt(2, purchase.getCustomer_id());
			pstmt.setInt(3, purchase.getProduct_id());
			pstmt.setInt(4, purchase.getCategory_id());
			pstmt.setString(5, purchase.getCoupon() != null ? purchase.getCoupon().name() : null);
			pstmt.setDate(6, java.sql.Date.valueOf(purchase.getPurchase_date()));
			pstmt.setDouble(7, purchase.getAmountPaid());
	
			pstmt.executeUpdate();
			System.out.println("Purchase record inserted successfully.");
		} catch (SQLException e) {
			System.out.println("Error inserting purchase: " + e.getMessage());
		} finally {
			db.close();
		}
}


}
