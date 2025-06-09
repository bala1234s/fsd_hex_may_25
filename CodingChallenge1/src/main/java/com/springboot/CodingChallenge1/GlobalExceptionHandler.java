package com.springboot.CodingChallenge1;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.springboot.CodingChallenge1.exception.DoctorNotFoundException;
import com.springboot.CodingChallenge1.exception.PatientNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

	/*
	 * Whenever the RuntimeException throws in Controller , the exception will call
	 * */
	@ExceptionHandler(exception = RuntimeException.class)
	public ResponseEntity<?> handleRuntime(RuntimeException e) {
		
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	
	
	/*
	 * Whenever the Patient is invalid then throws in Controller , the exception will call
	 * */
	@ExceptionHandler(exception = PatientNotFoundException.class)
	public ResponseEntity<?> handlePatientInvalid(PatientNotFoundException e) {
		
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	
	/*
	 * Whenever the Doctor is invalid then throws in Controller , the exception will call
	 * */
	@ExceptionHandler(exception = DoctorNotFoundException.class)
	public ResponseEntity<?> handlePatientInvalid(DoctorNotFoundException e) {
		
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	
	
}
