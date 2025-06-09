package com.springboot.CodingChallenge1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.CodingChallenge1.model.Doctor;
import com.springboot.CodingChallenge1.service.DoctorService;

@RestController
@RequestMapping("api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;
    
    /*
     * Aim : To insert new Doctor
     * Path : api/doctor/add
     * Method : POST
     * Input : new Doctor
     * Response : Doctor
     * */

    @PostMapping("/add")
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor) {
        Doctor savedDoctor = doctorService.addDoctor(doctor);
        return ResponseEntity.ok(savedDoctor);
   }
}
