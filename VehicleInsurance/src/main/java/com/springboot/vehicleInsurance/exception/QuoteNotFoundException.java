package com.springboot.vehicleInsurance.exception;

public class QuoteNotFoundException extends RuntimeException {
private static final long serialVersionUID = 1L;
	
	private String message;

	public QuoteNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
