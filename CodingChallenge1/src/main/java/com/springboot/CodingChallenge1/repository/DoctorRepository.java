package com.springboot.CodingChallenge1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.CodingChallenge1.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer>{

}
