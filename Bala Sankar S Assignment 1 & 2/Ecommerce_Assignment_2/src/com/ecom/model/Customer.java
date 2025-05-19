package com.ecom.model;

public class Customer {
	private int id;
	private String name;
	private String city;
	private String mobile;
	private String email;
	
	public Customer() {}
	
	
	public Customer(int id, String name, String city, String mobile, String email) {
		this.id = id;
		this.name = name;
		this.city = city;
		this.mobile = mobile;
		this.email = email;
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
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Override
	public String toString() {
		return "Customer [id=" + id + ", name=" + name + ", city=" + city + ", mobile=" + mobile + ", email=" + email + "]";
	}
}
