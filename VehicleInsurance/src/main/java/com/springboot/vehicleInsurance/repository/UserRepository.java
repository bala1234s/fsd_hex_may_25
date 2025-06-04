package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.vehicleInsurance.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{


	@Query("SELECT u FROM User u WHERE u.username = ?1")
	User getUserByUsername(String username);

}
