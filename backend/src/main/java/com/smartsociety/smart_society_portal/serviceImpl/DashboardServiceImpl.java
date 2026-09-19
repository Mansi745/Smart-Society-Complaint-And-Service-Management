package com.smartsociety.smart_society_portal.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.dto.DashboardResponse;
import com.smartsociety.smart_society_portal.entity.User;
import com.smartsociety.smart_society_portal.repository.ComplaintRepository;
import com.smartsociety.smart_society_portal.repository.UserRepository;
import com.smartsociety.smart_society_portal.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;


    // =====================================================
    // GET DASHBOARD DATA
    // =====================================================

    @Override
    public DashboardResponse getDashboardData() {

        DashboardResponse response =
                new DashboardResponse();


        // =================================================
        // TOTAL COMPLAINTS
        // =================================================

        response.setTotalComplaints(
                complaintRepository.count()
        );


        // =================================================
        // PENDING COMPLAINTS
        // =================================================

        response.setPendingComplaints(
                complaintRepository.countByStatus(
                        "Pending"
                )
        );


        // =================================================
        // IN PROGRESS COMPLAINTS
        // =================================================

        response.setInProgressComplaints(
                complaintRepository.countByStatus(
                        "In Progress"
                )
        );


        // =================================================
        // RESOLVED COMPLAINTS
        // =================================================

        response.setResolvedComplaints(
                complaintRepository.countByStatus(
                        "Resolved"
                )
        );


        // =================================================
        // TOTAL RESIDENTS
        // =================================================
        // IMPORTANT:
        // Only users whose role is RESIDENT
        // will be counted.
        //
        // ADMIN  -> NOT COUNTED
        // STAFF  -> NOT COUNTED
        // RESIDENT -> COUNTED
        // =================================================

        long totalResidents =
                userRepository.countByRole(
                        User.Role.RESIDENT
                );

        response.setTotalResidents(
                totalResidents
        );


        return response;
    }
}