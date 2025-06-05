package com.springboot.vehicleInsurance.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "quote")
public class Quote {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private double premium;
	private double addOnPrice;
	private double total;
	private LocalDate sendDate;
	
	
	
	@ManyToOne
	private PolicyHolder policyHolder;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	

	public double getPremium() {
		return premium;
	}

	public void setPremium(double premium) {
		this.premium = premium;
	}

	public double getAddOnPrice() {
		return addOnPrice;
	}

	public void setAddOnPrice(double addOnPrice) {
		this.addOnPrice = addOnPrice;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public LocalDate getSendDate() {
		return sendDate;
	}

	public void setSendDate(LocalDate sendDate) {
		this.sendDate = sendDate;
	}

	public PolicyHolder getPolicyHolder() {
		return policyHolder;
	}

	public void setPolicyHolder(PolicyHolder policyHolder) {
		this.policyHolder = policyHolder;
	}

	
	 
	
	
	

}
