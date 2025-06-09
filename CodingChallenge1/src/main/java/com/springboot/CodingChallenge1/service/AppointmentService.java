package com.springboot.CodingChallenge1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.CodingChallenge1.exception.DoctorNotFoundException;
import com.springboot.CodingChallenge1.exception.PatientNotFoundException;
import com.springboot.CodingChallenge1.model.Appointment;
import com.springboot.CodingChallenge1.model.Doctor;
import com.springboot.CodingChallenge1.model.Patient;
import com.springboot.CodingChallenge1.repository.AppointmentRepository;
import com.springboot.CodingChallenge1.repository.DoctorRepository;
import com.springboot.CodingChallenge1.repository.PatientRepository;

@Service
public class AppointmentService {
	
	private AppointmentRepository appointmentRepository;
	private PatientRepository patientRepository;
	private DoctorRepository doctorRepository;
	
	

	public AppointmentService(AppointmentRepository appointmentRepository, PatientRepository patientRepository,
			DoctorRepository doctorRepository) {
		super();
		this.appointmentRepository = appointmentRepository;
		this.patientRepository = patientRepository;
		this.doctorRepository = doctorRepository;
	}



	public Appointment addAppointment(int patientId, int doctorId, Appointment appointment) {
		// Fetch patient by ID
	    Patient patient = patientRepository.findById(patientId)
	        .orElseThrow(() -> new PatientNotFoundException("Patient not found with ID: " + patientId));

	    // Fetch doctor by ID
	    Doctor doctor = doctorRepository.findById(doctorId)
	        .orElseThrow(() -> new DoctorNotFoundException("Doctor not found with ID: " + doctorId));

	    // Set patient and doctor to appointment
	    appointment.setPatient(patient);
	    appointment.setDoctor(doctor);

	   

	    // Save appointment in DB
	    return appointmentRepository.save(appointment);
	}



	public List<Patient> getPatientsByDoctor(String username) {
		List<Patient> patients = appointmentRepository.getPatientsByDoctor(username);
		if(patients == null) {
			throw new PatientNotFoundException("Patient Not found");
		}
		return patients;
	}

}
