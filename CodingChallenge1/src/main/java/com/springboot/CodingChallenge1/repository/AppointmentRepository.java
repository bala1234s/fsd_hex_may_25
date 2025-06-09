package com.springboot.CodingChallenge1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.CodingChallenge1.model.Appointment;
import com.springboot.CodingChallenge1.model.Patient;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer>{

	@Query("select a.patient from Appointment a where a.doctor.user.username = ?1")
	List<Patient> getPatientsByDoctor(String username);

}
