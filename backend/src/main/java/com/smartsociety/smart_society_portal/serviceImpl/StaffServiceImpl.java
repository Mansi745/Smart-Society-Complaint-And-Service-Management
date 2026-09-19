package com.smartsociety.smart_society_portal.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.entity.Complaint;
import com.smartsociety.smart_society_portal.entity.Staff;
import com.smartsociety.smart_society_portal.exception.ResourceNotFoundException;
import com.smartsociety.smart_society_portal.repository.ComplaintRepository;
import com.smartsociety.smart_society_portal.repository.StaffRepository;
import com.smartsociety.smart_society_portal.service.StaffService;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public Staff addStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    @Override
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @Override
    public Staff getStaffById(Long id) {
        return staffRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Staff not found"));
    }

    @Override
    public Staff updateStaff(Long id, Staff staff) {

        Staff existingStaff = staffRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Staff not found"));

        existingStaff.setName(staff.getName());
        existingStaff.setRole(staff.getRole());
        existingStaff.setMobile(staff.getMobile());
        existingStaff.setComplaints(staff.getComplaints());
        existingStaff.setStatus(staff.getStatus());

        return staffRepository.save(existingStaff);
    }

    @Override
    public void deleteStaff(Long id) {

        Staff staff = staffRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Staff not found"));

        staffRepository.delete(staff);
    }

    @Override
    public List<Staff> searchStaff(String keyword) {
        return staffRepository.findByNameContainingIgnoreCase(keyword);
    }

    // =========================
    // ADMIN APPROVAL
    // =========================

    @Override
    public Staff approveStaff(Long id) {

        Staff staff = staffRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Staff not found"));

        staff.setStatus("AVAILABLE");

        return staffRepository.save(staff);
    }

    @Override
    public List<Staff> getPendingStaff() {
        return staffRepository.findByStatus("PENDING");
    }

    // =========================
    // STAFF COMPLAINTS
    // =========================

    @Override
    public List<Complaint> getAssignedComplaints(Long staffId) {

        return complaintRepository.findByAssignedStaff_Id(staffId);
    }
}