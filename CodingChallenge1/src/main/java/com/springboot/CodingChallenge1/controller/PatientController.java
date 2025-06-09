package com.springboot.CodingChallenge1.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.CodingChallenge1.dto.PatientWithMedicalHistory;
import com.springboot.CodingChallenge1.model.Patient;
import com.springboot.CodingChallenge1.service.PatientService;

@RestController
@RequestMapping("api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;
    
    /*
     * Aim : To insert new Patient
     * Path : api/patient/add
     * Method : POST
     * Input : new Patient
     * Response : Patient
     * */

    @PostMapping("/add")
    public ResponseEntity<?> addPatientWithMedicalHistory(@RequestBody PatientWithMedicalHistory dto) {
        Patient savedPatient = patientService.addPatientWithMedicalHistory(dto);
        return ResponseEntity.ok(savedPatient);
    }
    
    
}
