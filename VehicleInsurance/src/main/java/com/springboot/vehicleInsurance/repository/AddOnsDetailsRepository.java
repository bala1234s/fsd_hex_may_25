package com.springboot.vehicleInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.vehicleInsurance.model.AddOnsDetails;

public interface AddOnsDetailsRepository extends JpaRepository<AddOnsDetails, Integer>{

	 @Transactional
    @Modifying
    @Query("delete from AddOnsDetails a where a.id = ?1")
    void deleteAddOn(int id);

}
