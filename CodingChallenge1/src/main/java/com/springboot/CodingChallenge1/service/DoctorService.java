package com.springboot.CodingChallenge1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.CodingChallenge1.enums.Speciality;
import com.springboot.CodingChallenge1.model.Doctor;
import com.springboot.CodingChallenge1.model.User;
import com.springboot.CodingChallenge1.repository.DoctorRepository;


@Service
public class DoctorService {

	
    private DoctorRepository doctorRepository;
    private UserService userService;
    
    

    public DoctorService(DoctorRepository doctorRepository, UserService userService) {
		super();
		this.doctorRepository = doctorRepository;
		this.userService = userService;
	}



	public Doctor addDoctor(Doctor doctor) {
    	// Take user from the Learner Object
		User user = doctor.getUser();
		
		// Set Role as LEARNER in User
		user.setRole("DOCTOR");
		
		// save user in DB
		user = userService.signUp(user);
		
		// attach User in Learner
		doctor.setUser(user);
    	
        return doctorRepository.save(doctor);
    }

}
