package com.smartsociety.smart_society_portal.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartsociety.smart_society_portal.entity.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByUser_Id(Long userId);
    List<Staff> findByNameContainingIgnoreCase(String keyword);

    List<Staff> findByRoleIgnoreCase(String role);

    List<Staff> findByRoleIgnoreCaseAndStatus(
            String role,
            String status
    );

    // IMPORTANT
    List<Staff> findByStatus(String status);
}