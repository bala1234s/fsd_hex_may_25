package com.springboot.vehicleInsurance.exception;

public class PaymentNotFoundException extends RuntimeException {
private static final long serialVersionUID = 1L;
	
	private String message;

	public PaymentNotFoundException(String message) {
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
