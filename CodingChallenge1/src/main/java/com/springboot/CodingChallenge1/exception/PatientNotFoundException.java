package com.springboot.CodingChallenge1.exception;

public class PatientNotFoundException extends RuntimeException{

	
	private static final long serialVersionUID = 1L;
	
	private String message;
	public PatientNotFoundException(String message) {
		this.message = message;
	}
	public String getMessage() {
		return message;
	}
	

}
