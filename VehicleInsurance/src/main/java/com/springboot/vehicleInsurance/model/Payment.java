package com.springboot.vehicleInsurance.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment")
public class Payment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String status;
	private double paid;
	private LocalDate paidDate;
	
	@ManyToOne
	private Quote quote;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getPaid() {
		return paid;
	}

	public void setPaid(double paid) {
		this.paid = paid;
	}

	public LocalDate getPaidDate() {
		return paidDate;
	}

	public void setPaidDate(LocalDate paidDate) {
		this.paidDate = paidDate;
	}

	public Quote getQuote() {
		return quote;
	}

	public void setQuote(Quote quote) {
		this.quote = quote;
	}

	
	
	
}
