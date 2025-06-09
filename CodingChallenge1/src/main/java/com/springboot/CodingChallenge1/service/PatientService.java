package com.springboot.CodingChallenge1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springboot.CodingChallenge1.dto.PatientWithMedicalHistory;
import com.springboot.CodingChallenge1.model.MedicalHistory;
import com.springboot.CodingChallenge1.model.Patient;
import com.springboot.CodingChallenge1.model.User;
import com.springboot.CodingChallenge1.repository.MedicalHistoryRepository;
import com.springboot.CodingChallenge1.repository.PatientRepository;

@Service
public class PatientService {
	private  PatientRepository patientRepository;
    private  UserService userService;
    private MedicalHistoryRepository medicalHistoryRepository;

   

    public PatientService(PatientRepository patientRepository, UserService userService,
			MedicalHistoryRepository medicalHistoryRepository) {
		super();
		this.patientRepository = patientRepository;
		this.userService = userService;
		this.medicalHistoryRepository = medicalHistoryRepository;
	}



	public Patient addPatientWithMedicalHistory(PatientWithMedicalHistory dto) {
        Patient patient = dto.getPatient();
        List<MedicalHistory> histories = dto.getMedicalHistories();

        // Extract user and set role
        User user = patient.getUser();
        user.setRole("PATIENT");
        user = userService.signUp(user); 
        patient.setUser(user);

        // Save patient first to get ID
        Patient savedPatient = patientRepository.save(patient);

        // Set patient reference in each MedicalHistory entry
        histories.forEach(history -> history.setPatient(savedPatient));

        // Save medical history list
        medicalHistoryRepository.saveAll(histories);

        return savedPatient;
    }

}
