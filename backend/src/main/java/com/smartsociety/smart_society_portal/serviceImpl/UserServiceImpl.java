package com.smartsociety.smart_society_portal.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.dto.ChangePasswordRequest;
import com.smartsociety.smart_society_portal.dto.LoginRequest;
import com.smartsociety.smart_society_portal.dto.LoginResponse;
import com.smartsociety.smart_society_portal.dto.StaffRegistrationRequest;
import com.smartsociety.smart_society_portal.entity.Notification;
import com.smartsociety.smart_society_portal.entity.Staff;
import com.smartsociety.smart_society_portal.entity.User;
import com.smartsociety.smart_society_portal.repository.StaffRepository;
import com.smartsociety.smart_society_portal.repository.UserRepository;
import com.smartsociety.smart_society_portal.service.NotificationService;
import com.smartsociety.smart_society_portal.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private NotificationService notificationService;


    // =====================================================
    // NORMAL USER / RESIDENT / ADMIN REGISTRATION
    // =====================================================

    @Override
    public User registerUser(User user) {

        // Check duplicate email
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        /*
         * Resident / Admin registration
         *
         * If role is not provided, make it RESIDENT.
         * If ADMIN is provided, keep ADMIN.
         */
        if (user.getRole() == null) {
            user.setRole(User.Role.RESIDENT);
        }

        // Resident/Admin does not need profession
        if (user.getRole() != User.Role.STAFF) {
            user.setProfession(null);
        }

        // Save user
        return userRepository.save(user);
    }


    // =====================================================
    // STAFF REGISTRATION
    // =====================================================

    @Override
    public User registerStaff(StaffRegistrationRequest request) {

        // Check duplicate email
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // -------------------------------------------------
        // VALIDATE PROFESSION
        // -------------------------------------------------

        if (request.getProfession() == null ||
                request.getProfession().trim().isEmpty()) {

            throw new RuntimeException(
                    "Profession is required for staff registration"
            );
        }


        // -------------------------------------------------
        // CREATE USER
        // -------------------------------------------------

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());

        // Staff profession
        user.setProfession(request.getProfession());

        // Application role
        user.setRole(User.Role.STAFF);


        // -------------------------------------------------
        // SAVE USER
        // -------------------------------------------------

        User savedUser = userRepository.save(user);


        // =================================================
        // CREATE STAFF PROFILE
        // =================================================

        Staff staff = new Staff();

        staff.setName(savedUser.getName());

        // Profession stored as staff role
        staff.setRole(savedUser.getProfession());

        staff.setMobile(savedUser.getPhone());

        // Initially no complaints
        staff.setComplaints(0);

        // Newly registered staff is available
        staff.setStatus("AVAILABLE");

        // Link staff with user
        staff.setUser(savedUser);

        staffRepository.save(staff);


        // =================================================
        // NOTIFY ALL ADMINS
        // =================================================

        List<User> users = userRepository.findAll();

        for (User admin : users) {

            if (admin.getRole() == User.Role.ADMIN) {

                Notification notification =
                        new Notification(
                                null,
                                "New Staff Registration",
                                "New staff member "
                                        + savedUser.getName()
                                        + " has registered as "
                                        + savedUser.getProfession()
                                        + ".",
                                "STAFF_REGISTERED",
                                admin
                        );

                notificationService.addNotification(
                        notification
                );
            }
        }

        return savedUser;
    }


    // =====================================================
    // GET USER BY EMAIL
    // =====================================================

    @Override
    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }


    // =====================================================
    // GET ALL USERS
    // =====================================================

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }


    // =====================================================
    // GET ALL RESIDENTS
    // =====================================================

    @Override
    public List<User> getAllResidents() {

        return userRepository.findByRole(
                User.Role.RESIDENT
        );
    }


    // =====================================================
    // GET USER BY ID
    // =====================================================

    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }


    // =====================================================
    // UPDATE USER
    // =====================================================

    @Override
    public User updateUser(
            Long id,
            User user
    ) {

        User existingUser =
                userRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        existingUser.setName(user.getName());
        existingUser.setPhone(user.getPhone());

        /*
         * Profession is only relevant for STAFF.
         */
        if (existingUser.getRole() == User.Role.STAFF) {
            existingUser.setProfession(
                    user.getProfession()
            );
        }

        return userRepository.save(existingUser);
    }


    // =====================================================
    // DELETE USER
    // =====================================================

    @Override
    public void deleteUser(Long id) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        /*
         * If this user is a staff member,
         * delete staff profile first.
         */
        if (user.getRole() == User.Role.STAFF) {

            staffRepository
                    .findByUser_Id(id)
                    .ifPresent(staff ->
                            staffRepository.delete(staff)
                    );
        }

        userRepository.delete(user);
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @Override
    public LoginResponse login(
            LoginRequest request
    ) {

        User user =
                userRepository.findByEmail(
                        request.getEmail()
                ).orElseThrow(() ->
                        new RuntimeException("Invalid Email")
                );


        // Plain password comparison
        if (!request.getPassword()
                .equals(user.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }


        // -------------------------------------------------
        // GET STAFF ID
        // -------------------------------------------------

        Long staffId = null;

        if (user.getRole() == User.Role.STAFF) {

            Staff staff =
                    staffRepository
                            .findByUser_Id(user.getId())
                            .orElse(null);

            if (staff != null) {
                staffId = staff.getId();
            }
        }


        // -------------------------------------------------
        // LOGIN RESPONSE
        // -------------------------------------------------

        return new LoginResponse(
                user.getId(),
                staffId,
                "Login Successful",
                user.getRole().name(),
                user.getName(),
                user.getProfession()
        );
    }


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    @Override
    public String changePassword(
            Long userId,
            ChangePasswordRequest request
    ) {

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        if (!request.getOldPassword()
                .equals(user.getPassword())) {

            throw new RuntimeException(
                    "Old password is incorrect"
            );
        }


        user.setPassword(
                request.getNewPassword()
        );

        userRepository.save(user);

        return "Password changed successfully";
    }


    // =====================================================
    // RESET PASSWORD
    // =====================================================

    @Override
    public void resetPassword(
            String email,
            String password
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        user.setPassword(password);

        userRepository.save(user);
    }
}