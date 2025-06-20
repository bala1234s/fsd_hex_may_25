package com.springboot.vehicleInsurance.model;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "review")
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String comments;
	private double rating;
	
	@ManyToOne
	private PolicyHolder policyHolder;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public PolicyHolder getPolicyHolder() {
		return policyHolder;
	}

	public void setPolicyHolder(PolicyHolder policyHolder) {
		this.policyHolder = policyHolder;
	}

	@Override
	public int hashCode() {
		return Objects.hash(comments, id, rating);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Review other = (Review) obj;
		return Objects.equals(comments, other.comments) && id == other.id
				&& Double.doubleToLongBits(rating) == Double.doubleToLongBits(other.rating);
	}
	
	
	
	
	
	
}
