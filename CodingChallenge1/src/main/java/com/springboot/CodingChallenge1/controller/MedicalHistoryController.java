package com.springboot.CodingChallenge1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.CodingChallenge1.dto.MedicalHistoryDto;
import com.springboot.CodingChallenge1.dto.PatientWithMedicalHistory;
import com.springboot.CodingChallenge1.model.MedicalHistory;
import com.springboot.CodingChallenge1.service.MedicalHistoryService;

@RestController
@RequestMapping("/api/medical-history")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;
    
    /*
     * Aim : To add the Medical History by the patient using batching
     * Path : api/medical-history/add/{patientId}
     * Method : POST
     * Response : List<MedicalHistory>
     * Input : patientId , List<MedicalHistory>
     * 
     * */

    @PostMapping("/add/{patientId}")
    public ResponseEntity<?> addBatchMedicalHistory(@PathVariable int patientId, @RequestBody List<MedicalHistory> historyList) {
        medicalHistoryService.addBatchMedicalHistory(patientId, historyList);
        return ResponseEntity.status(HttpStatus.OK).body("Medical History Added Successfully");
    }
    
    /*
     * Aim : To get medical records by patient id
     * Path : api/medical-history/get/{patientId}
     * Method : GET
     * Response : List<MedicalHistory>
     * Input : patientId , List<MedicalHistory>
     * 
     * */
    
    @GetMapping("/get/{patientId}")
    public List<MedicalHistoryDto> getPatientWithMedicalHistory(@PathVariable int patientId) {
         
        return medicalHistoryService.getPatientWithHistory(patientId);
    }
}

