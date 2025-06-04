package com.springboot.vehicleInsurance.model;

import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private int id;
	private String name;
	private LocalDate DOB;
	private int age;
	private String address;
	private String aadharNumber;
	private String panNumber;
	
	@OneToOne
	private User user;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	public int getAge() {
	    return age;
	}

	public void setDOB(LocalDate dOB) {
	    this.DOB = dOB;
	    this.age = Period.between(this.DOB, LocalDate.now()).getYears(); 
	}

	public LocalDate getDOB() {
		return DOB;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAadharNumber() {
		return aadharNumber;
	}
	public void setAadharNumber(String aadharNumber) {
		this.aadharNumber = aadharNumber;
	}
	public String getPanNumber() {
		return panNumber;
	}
	public void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}
	@Override
	public int hashCode() {
		return Objects.hash(DOB, aadharNumber, address, age, id, name, panNumber);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Customer other = (Customer) obj;
		return Objects.equals(DOB, other.DOB) && Objects.equals(aadharNumber, other.aadharNumber)
				&& Objects.equals(address, other.address) && age == other.age && id == other.id
				&& Objects.equals(name, other.name) && Objects.equals(panNumber, other.panNumber);
	}
	
	
	

}
