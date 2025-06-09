package com.springboot.CodingChallenge1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.CodingChallenge1.model.User;


public interface UserRepository extends JpaRepository<User, Integer> {

	
	@Query("SELECT u FROM User u WHERE u.username = ?1")
	User getUserByUsername(String username);

}
