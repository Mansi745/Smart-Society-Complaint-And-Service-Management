package com.smartsociety.smart_society_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.entity.Complaint;
import com.smartsociety.smart_society_portal.entity.Staff;
import com.smartsociety.smart_society_portal.service.StaffService;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffController {

    @Autowired
    private StaffService staffService;

    // =========================
    // ADD STAFF
    // =========================

    @PostMapping
    public Staff addStaff(@RequestBody Staff staff) {
        return staffService.addStaff(staff);
    }

    // =========================
    // GET ALL STAFF
    // =========================

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    // =========================
    // GET PENDING STAFF
    // =========================

    @GetMapping("/pending")
    public List<Staff> getPendingStaff() {
        return staffService.getPendingStaff();
    }

    // =========================
    // GET STAFF BY ID
    // =========================

    @GetMapping("/{id}")
    public Staff getStaffById(@PathVariable Long id) {
        return staffService.getStaffById(id);
    }

    // =========================
    // GET ASSIGNED COMPLAINTS
    // =========================

    @GetMapping("/{id}/complaints")
    public List<Complaint> getAssignedComplaints(@PathVariable Long id) {
        return staffService.getAssignedComplaints(id);
    }

    // =========================
    // UPDATE STAFF
    // =========================

    @PutMapping("/{id}")
    public Staff updateStaff(
            @PathVariable Long id,
            @RequestBody Staff staff) {

        return staffService.updateStaff(id, staff);
    }

    // =========================
    // DELETE STAFF
    // =========================

    @DeleteMapping("/{id}")
    public void deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
    }

    // =========================
    // SEARCH STAFF
    // =========================

    @GetMapping("/search")
    public List<Staff> searchStaff(
            @RequestParam String keyword) {

        return staffService.searchStaff(keyword);
    }

    // =========================
    // APPROVE STAFF
    // =========================

    @PutMapping("/{id}/approve")
    public Staff approveStaff(@PathVariable Long id) {

        return staffService.approveStaff(id);
    }
}