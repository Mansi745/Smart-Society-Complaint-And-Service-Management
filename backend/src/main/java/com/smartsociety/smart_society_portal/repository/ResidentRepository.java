package com.smartsociety.smart_society_portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartsociety.smart_society_portal.entity.Resident;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {

    List<Resident> findByNameContainingIgnoreCase(String keyword);

}