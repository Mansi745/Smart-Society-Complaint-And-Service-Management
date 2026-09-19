package com.smartsociety.smart_society_portal.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.entity.Complaint;
import com.smartsociety.smart_society_portal.entity.Notification;
import com.smartsociety.smart_society_portal.entity.Staff;
import com.smartsociety.smart_society_portal.entity.User;
import com.smartsociety.smart_society_portal.exception.ResourceNotFoundException;
import com.smartsociety.smart_society_portal.repository.ComplaintRepository;
import com.smartsociety.smart_society_portal.repository.StaffRepository;
import com.smartsociety.smart_society_portal.repository.UserRepository;
import com.smartsociety.smart_society_portal.service.ComplaintService;
import com.smartsociety.smart_society_portal.service.NotificationService;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StaffRepository staffRepository;


    // =====================================================
    // ADD COMPLAINT
    // =====================================================

    @Override
    public Complaint addComplaint(Complaint complaint) {

        Complaint savedComplaint =
                complaintRepository.save(complaint);


        User complaintUser = null;


        if (savedComplaint.getUser() != null
                && savedComplaint.getUser().getId() != null) {

            complaintUser =
                    userRepository.findById(
                            savedComplaint.getUser().getId()
                    ).orElse(null);
        }


        // =================================================
        // NOTIFY RESIDENT
        // =================================================

        if (complaintUser != null) {

            Notification residentNotification =
                    new Notification(
                            null,
                            "Complaint Submitted",
                            "Your complaint '"
                                    + savedComplaint.getTitle()
                                    + "' has been submitted successfully.",
                            "COMPLAINT_SUBMITTED",
                            complaintUser
                    );

            notificationService.addNotification(
                    residentNotification
            );
        }


        // =================================================
        // NOTIFY ALL ADMINS
        // =================================================

        List<User> users =
                userRepository.findAll();


        for (User user : users) {

            if (user.getRole() != null
                    && user.getRole() == User.Role.ADMIN) {

                String residentName =
                        complaintUser != null
                                ? complaintUser.getName()
                                : "a resident";


                Notification adminNotification =
                        new Notification(
                                null,
                                "New Complaint",
                                "A new complaint '"
                                        + savedComplaint.getTitle()
                                        + "' has been raised by "
                                        + residentName,
                                "NEW_COMPLAINT",
                                user
                        );


                notificationService.addNotification(
                        adminNotification
                );
            }
        }


        return savedComplaint;
    }


    // =====================================================
    // GET ALL COMPLAINTS
    // =====================================================

    @Override
    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }


    // =====================================================
    // GET COMPLAINT BY ID
    // =====================================================

    @Override
    public Complaint getComplaintById(Long id) {

        return complaintRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Complaint not found"
                        ));
    }


    // =====================================================
    // GET COMPLAINT BY ID FOR USER
    // =====================================================

    @Override
    public Complaint getComplaintByIdForUser(
            Long id,
            Long userId) {

        Complaint complaint =
                getComplaintById(id);


        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                ));


        boolean allowed;


        switch (user.getRole()) {

            case ADMIN:

                allowed = true;

                break;


            case RESIDENT:

                allowed =
                        complaint.getUser() != null
                                && complaint.getUser()
                                .getId()
                                .equals(userId);

                break;


            case STAFF:

                allowed =
                        complaint.getAssignedStaff() != null
                                && complaint
                                .getAssignedStaff()
                                .getUser() != null
                                && complaint
                                .getAssignedStaff()
                                .getUser()
                                .getId()
                                .equals(userId);

                break;


            default:

                allowed = false;
        }


        if (!allowed) {

            throw new ResourceNotFoundException(
                    "Complaint not found"
            );
        }


        return complaint;
    }


    // =====================================================
    // UPDATE COMPLAINT
    // =====================================================

    @Override
    public Complaint updateComplaint(
            Long id,
            Complaint complaint) {

        Complaint existingComplaint =
                complaintRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint not found"
                                ));


        // =================================================
        // OLD STATUS
        // =================================================

        String oldStatus =
                existingComplaint.getStatus();


        String newStatus =
                complaint.getStatus();


        // =================================================
        // UPDATE BASIC DETAILS
        // =================================================

        existingComplaint.setTitle(
                complaint.getTitle()
        );


        existingComplaint.setDescription(
                complaint.getDescription()
        );


        existingComplaint.setCategory(
                complaint.getCategory()
        );


        existingComplaint.setPriority(
                complaint.getPriority()
        );


        // =================================================
        // UPDATE STATUS
        // =================================================

        if (newStatus != null
                && !newStatus.trim().isEmpty()) {

            existingComplaint.setStatus(
                    newStatus
            );
        }


        // =================================================
        // CHECK STATUS CHANGE
        // =================================================

        boolean statusChanged =
                newStatus != null
                        && !newStatus.trim().isEmpty()
                        && !newStatus.equalsIgnoreCase(
                        oldStatus == null
                                ? ""
                                : oldStatus
                );


        // =================================================
        // NOTIFY RESIDENT FOR EVERY STATUS CHANGE
        // =================================================

        if (statusChanged
                && existingComplaint.getUser() != null) {


            String title;

            String message;

            String notificationType;


            // =============================================
            // ASSIGNED
            // =============================================

            if ("Assigned".equalsIgnoreCase(
                    newStatus)) {

                title =
                        "Complaint Assigned";


                String staffName =
                        existingComplaint
                                .getAssignedStaff() != null
                                ? existingComplaint
                                .getAssignedStaff()
                                .getName()
                                : "a staff member";


                message =
                        "Your complaint '"
                                + existingComplaint.getTitle()
                                + "' has been assigned to "
                                + staffName
                                + ".";


                notificationType =
                        "COMPLAINT_ASSIGNED";
            }


            // =============================================
            // IN PROGRESS
            // =============================================

            else if ("In Progress".equalsIgnoreCase(
                    newStatus)) {

                title =
                        "Complaint In Progress";


                message =
                        "Your complaint '"
                                + existingComplaint.getTitle()
                                + "' is now in progress.";


                notificationType =
                        "COMPLAINT_IN_PROGRESS";
            }


            // =============================================
            // RESOLVED
            // =============================================

            else if ("Resolved".equalsIgnoreCase(
                    newStatus)) {

                title =
                        "Complaint Resolved";


                message =
                        "Your complaint '"
                                + existingComplaint.getTitle()
                                + "' has been resolved successfully.";


                notificationType =
                        "COMPLAINT_RESOLVED";
            }


            // =============================================
            // COMPLETED
            // =============================================

            else if ("Completed".equalsIgnoreCase(
                    newStatus)) {

                title =
                        "Complaint Completed";


                message =
                        "Your complaint '"
                                + existingComplaint.getTitle()
                                + "' has been completed successfully.";


                notificationType =
                        "COMPLAINT_COMPLETED";
            }


            // =============================================
            // ANY OTHER STATUS
            // =============================================

            else {

                title =
                        "Complaint Status Updated";


                message =
                        "Your complaint '"
                                + existingComplaint.getTitle()
                                + "' status has been changed to "
                                + newStatus
                                + ".";


                notificationType =
                        "COMPLAINT_STATUS_UPDATED";
            }


            Notification residentNotification =
                    new Notification(
                            null,
                            title,
                            message,
                            notificationType,
                            existingComplaint.getUser()
                    );


            notificationService.addNotification(
                    residentNotification
            );
        }


        // =================================================
        // RESOLVED / COMPLETED
        // =================================================

        boolean resolved =
                "Resolved".equalsIgnoreCase(
                        newStatus
                )
                        ||
                        "Completed".equalsIgnoreCase(
                                newStatus
                        );


        boolean wasNotResolved =
                !(
                        "Resolved".equalsIgnoreCase(
                                oldStatus
                        )
                                ||
                                "Completed".equalsIgnoreCase(
                                        oldStatus
                                )
                );


        if (resolved && wasNotResolved) {

            Staff assignedStaff =
                    existingComplaint
                            .getAssignedStaff();


            if (assignedStaff != null) {

                int currentCount =
                        assignedStaff.getComplaints() == null
                                ? 0
                                : assignedStaff.getComplaints();


                if (currentCount > 0) {

                    assignedStaff.setComplaints(
                            currentCount - 1
                    );
                }


                assignedStaff.setStatus(
                        "AVAILABLE"
                );


                staffRepository.save(
                        assignedStaff
                );
            }
        }


        // =================================================
        // SAVE
        // =================================================

        return complaintRepository.save(
                existingComplaint
        );
    }


    // =====================================================
    // DELETE
    // =====================================================

    @Override
    public void deleteComplaint(Long id) {

        Complaint complaint =
                complaintRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint not found"
                                ));


        complaintRepository.delete(
                complaint
        );
    }


    // =====================================================
    // SEARCH
    // =====================================================

    @Override
    public List<Complaint> searchComplaint(
            String keyword) {

        return complaintRepository
                .findByTitleContainingIgnoreCase(
                        keyword
                );
    }


    // =====================================================
    // GET COMPLAINTS FOR USER
    // =====================================================

    @Override
    public List<Complaint> getComplaintsForUser(
            Long userId) {

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                ));


        switch (user.getRole()) {

            case ADMIN:

                return complaintRepository.findAll();


            case RESIDENT:

                return complaintRepository
                        .findByUser_Id(userId);


            case STAFF:

                Staff staff =
                        staffRepository
                                .findByUser_Id(userId)
                                .orElseThrow(() ->
                                        new ResourceNotFoundException(
                                                "Staff profile not found"
                                        ));


                return complaintRepository
                        .findByAssignedStaff_Id(
                                staff.getId()
                        );


            default:

                return List.of();
        }
    }


    // =====================================================
    // GET COMPLAINTS BY STAFF
    // =====================================================

    @Override
    public List<Complaint> getComplaintsByStaff(
            Long staffId) {

        Staff staff =
                staffRepository.findById(staffId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Staff not found"
                                ));


        return complaintRepository
                .findByAssignedStaff_Id(
                        staff.getId()
                );
    }


    // =====================================================
    // ASSIGN COMPLAINT
    // =====================================================

    @Override
    public Complaint assignComplaint(
            Long complaintId,
            Long staffId) {

        // =====================================================
        // FIND COMPLAINT
        // =====================================================

        Complaint complaint =
                complaintRepository.findById(complaintId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Complaint not found"
                                ));


        // =====================================================
        // FIND STAFF
        // =====================================================

        Staff staff =
                staffRepository.findById(staffId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Staff not found"
                                ));


        // =====================================================
        // CHECK STAFF STATUS
        // =====================================================

        if (!"AVAILABLE".equalsIgnoreCase(
                staff.getStatus())) {

            throw new RuntimeException(
                    "Staff is not available"
            );
        }


        // =====================================================
        // CATEGORY → STAFF ROLE MAPPING
        // =====================================================

        String category =
                complaint.getCategory();

        String role =
                staff.getRole();


        if (category == null || role == null) {

            throw new RuntimeException(
                    "Complaint category or staff role is missing"
            );
        }


        String categoryValue =
                category.trim().toLowerCase();

        String roleValue =
                role.trim().toLowerCase();


        boolean matched = false;


        // Plumbing → Plumber
        if (categoryValue.equals("plumbing")
                && (
                roleValue.equals("plumber")
                        || roleValue.equals("plumbing")
        )) {

            matched = true;
        }


        // Electrical → Electrician
        else if (categoryValue.equals("electrical")
                && (
                roleValue.equals("electrician")
                        || roleValue.equals("electrical")
        )) {

            matched = true;
        }


        // Cleaning → Cleaner
        else if (categoryValue.equals("cleaning")
                && (
                roleValue.equals("cleaner")
                        || roleValue.equals("cleaning")
        )) {

            matched = true;
        }


        // Maintenance → Maintenance
        else if (categoryValue.equals("maintenance")
                && roleValue.equals("maintenance")) {

            matched = true;
        }


        // Security → Security
        else if (categoryValue.equals("security")
                && (
                roleValue.equals("security")
                        || roleValue.equals("security guard")
        )) {

            matched = true;
        }


        // Parking → Parking
        else if (categoryValue.equals("parking")
                && roleValue.equals("parking")) {

            matched = true;
        }


        // =====================================================
        // CATEGORY DOES NOT MATCH
        // =====================================================

        if (!matched) {

            throw new RuntimeException(
                    "Staff profession does not match complaint category"
            );
        }


        // =====================================================
        // ASSIGN STAFF
        // =====================================================

        complaint.setAssignedStaff(staff);

        complaint.setStatus("Assigned");


        // =====================================================
        // INCREASE STAFF COMPLAINT COUNT
        // =====================================================

        int currentComplaints =
                staff.getComplaints() == null
                        ? 0
                        : staff.getComplaints();

        staff.setComplaints(
                currentComplaints + 1
        );


        // =====================================================
        // MAKE STAFF BUSY
        // =====================================================

        staff.setStatus("BUSY");


        // =====================================================
        // SAVE COMPLAINT
        // =====================================================

        Complaint savedComplaint =
                complaintRepository.save(complaint);


        // =====================================================
        // SAVE STAFF
        // =====================================================

        staffRepository.save(staff);


        // =====================================================
        // NOTIFY RESIDENT
        // =====================================================

        if (complaint.getUser() != null) {

            Notification residentNotification =
                    new Notification(
                            null,
                            "Complaint Assigned",
                            "Your complaint '"
                                    + complaint.getTitle()
                                    + "' has been assigned to "
                                    + staff.getName()
                                    + ".",
                            "COMPLAINT_ASSIGNED",
                            complaint.getUser()
                    );

            notificationService.addNotification(
                    residentNotification
            );
        }


        // =====================================================
        // NOTIFY STAFF
        // =====================================================

        if (staff.getUser() != null) {

            Notification staffNotification =
                    new Notification(
                            null,
                            "New Work Assigned",
                            "You have been assigned a new complaint: '"
                                    + complaint.getTitle()
                                    + "'. Priority: "
                                    + complaint.getPriority(),
                            "WORK_ASSIGNED",
                            staff.getUser()
                    );

            notificationService.addNotification(
                    staffNotification
            );
        }


        return savedComplaint;
    }
}