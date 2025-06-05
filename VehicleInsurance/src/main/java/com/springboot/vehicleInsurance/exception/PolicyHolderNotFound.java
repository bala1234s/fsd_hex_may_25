package com.springboot.vehicleInsurance.exception;

public class PolicyHolderNotFound extends RuntimeException {
private static final long serialVersionUID = 1L;
	
	private String message;

	public PolicyHolderNotFound(String message) {
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
