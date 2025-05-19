package com.ecom.model;

import java.sql.Date;
import java.time.LocalDate;

import com.ecom.enums.Coupon;

public class Purchase {
	private int id;
	private Customer customer;
	private Product product;
	private Category category;
	private int qty;
	private Coupon coupon;
	private LocalDate purchase_date;
	private double amountPaid;

	public Purchase() {}

	public Purchase(Product product, Category category, int id, int qty, Coupon coupon,
			LocalDate purchase_date, double amountPaid) {
		this.product = product;
		this.category = category;
		this.id = id;
		this.qty = qty;
		this.coupon = coupon;
		this.purchase_date = purchase_date;
		this.amountPaid = amountPaid;
	}

	public int getId() { return id; }
	public void setId(int id) { this.id = id; }

	public Customer getCustomer() { return customer; }
	public void setCustomer(Customer customer) { this.customer = customer; }

	public Product getProduct() { return product; }
	public void setProduct(Product product) { this.product = product; }

	public Category getCategory() { return category; }
	public void setCategory(Category category) { this.category = category; }

	public int getQty() { return qty; }
	public void setQty(int qty) { this.qty = qty; }

	public Coupon getCoupon() { return coupon; }
	public void setCoupon(Coupon coupon) { this.coupon = coupon; }

	public LocalDate getPurchase_date() { return purchase_date; }
	public void setPurchase_date(LocalDate purchase_date) { this.purchase_date = purchase_date; }

	public double getAmountPaid() { return amountPaid; }
	public void setAmountPaid(double amountPaid) { this.amountPaid = amountPaid; }

	public int getCustomer_id() { return customer.getId(); }
	public int getProduct_id() { return product.getId(); }
	public int getCategory_id() { return category.getId(); }
}
