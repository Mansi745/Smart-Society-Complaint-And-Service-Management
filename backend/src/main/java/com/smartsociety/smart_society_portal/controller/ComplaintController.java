package com.smartsociety.smart_society_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.entity.Complaint;
import com.smartsociety.smart_society_portal.service.ComplaintService;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;


    // =====================================================
    // ADD COMPLAINT
    // =====================================================

    @PostMapping
    public Complaint addComplaint(
            @RequestBody Complaint complaint) {

        return complaintService.addComplaint(
                complaint
        );
    }


    // =====================================================
    // GET COMPLAINTS
    // =====================================================

    @GetMapping
    public List<Complaint> getAllComplaints(
            @RequestParam(required = false) Long userId) {

        if (userId != null) {

            return complaintService
                    .getComplaintsForUser(userId);
        }


        return complaintService
                .getAllComplaints();
    }


    // =====================================================
    // GET BY ID
    // =====================================================

    @GetMapping("/{id}")
    public Complaint getComplaintById(
            @PathVariable Long id) {

        return complaintService
                .getComplaintById(id);
    }


    // =====================================================
    // UPDATE
    // =====================================================

    @PutMapping("/{id}")
    public Complaint updateComplaint(
            @PathVariable Long id,
            @RequestBody Complaint complaint) {

        return complaintService
                .updateComplaint(
                        id,
                        complaint
                );
    }


    // =====================================================
    // DELETE
    // =====================================================

    @DeleteMapping("/{id}")
    public String deleteComplaint(
            @PathVariable Long id) {

        complaintService
                .deleteComplaint(id);

        return "Complaint deleted successfully";
    }


    // =====================================================
    // SEARCH
    // =====================================================

    @GetMapping("/search")
    public List<Complaint> searchComplaint(
            @RequestParam String keyword) {

        return complaintService
                .searchComplaint(keyword);
    }


    // =====================================================
    // ASSIGN STAFF
    // =====================================================

    @PutMapping("/{complaintId}/assign/{staffId}")
    public Complaint assignComplaint(
            @PathVariable Long complaintId,
            @PathVariable Long staffId) {

        return complaintService
                .assignComplaint(
                        complaintId,
                        staffId
                );
    }


    // =====================================================
    // GET STAFF COMPLAINTS
    // =====================================================

    @GetMapping("/staff/{staffId}")
    public List<Complaint> getComplaintsByStaff(
            @PathVariable Long staffId) {

        return complaintService
                .getComplaintsByStaff(
                        staffId
                );
    }
}