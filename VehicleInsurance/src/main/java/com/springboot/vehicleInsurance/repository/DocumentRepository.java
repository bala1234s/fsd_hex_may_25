package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.vehicleInsurance.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Integer>{

}
