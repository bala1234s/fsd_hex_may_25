package com.springboot.CodingChallenge1.dto;

import java.util.List;

import com.springboot.CodingChallenge1.model.MedicalHistory;
import com.springboot.CodingChallenge1.model.Patient;

public class PatientWithMedicalHistory {
	
	private Patient patient;
	private List<MedicalHistory> medicalHistories;
	
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public List<MedicalHistory> getMedicalHistories() {
		return medicalHistories;
	}
	public void setMedicalHistories(List<MedicalHistory> medicalHistories) {
		this.medicalHistories = medicalHistories;
	}
	
	

}
