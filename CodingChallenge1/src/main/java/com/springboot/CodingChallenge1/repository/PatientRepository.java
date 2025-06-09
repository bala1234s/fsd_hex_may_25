package com.springboot.CodingChallenge1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.CodingChallenge1.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer>{

}
