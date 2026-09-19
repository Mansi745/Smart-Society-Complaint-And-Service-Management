package com.smartsociety.smart_society_portal.service;

import java.util.List;

import com.smartsociety.smart_society_portal.entity.Complaint;
import com.smartsociety.smart_society_portal.entity.Staff;

public interface StaffService {

    Staff addStaff(Staff staff);

    List<Staff> getAllStaff();

    Staff getStaffById(Long id);

    Staff updateStaff(Long id, Staff staff);

    void deleteStaff(Long id);

    List<Staff> searchStaff(String keyword);

    // Admin approval
    Staff approveStaff(Long id);

    List<Staff> getPendingStaff();

    // Staff complaints
    List<Complaint> getAssignedComplaints(Long staffId);
}