package com.smartsociety.smart_society_portal.service;

import java.util.List;

import com.smartsociety.smart_society_portal.dto.ChangePasswordRequest;
import com.smartsociety.smart_society_portal.dto.LoginRequest;
import com.smartsociety.smart_society_portal.dto.LoginResponse;
import com.smartsociety.smart_society_portal.dto.StaffRegistrationRequest;
import com.smartsociety.smart_society_portal.entity.User;

public interface UserService {

    // =====================================================
    // REGISTRATION
    // =====================================================

    User registerUser(User user);

    User registerStaff(StaffRegistrationRequest request);


    // =====================================================
    // GET USERS
    // =====================================================

    User getUserByEmail(String email);

    List<User> getAllUsers();

    List<User> getAllResidents();

    User getUserById(Long id);


    // =====================================================
    // UPDATE / DELETE
    // =====================================================

    User updateUser(Long id, User user);

    void deleteUser(Long id);


    // =====================================================
    // LOGIN
    // =====================================================

    LoginResponse login(LoginRequest request);


    // =====================================================
    // PASSWORD
    // =====================================================

    String changePassword(
            Long userId,
            ChangePasswordRequest request
    );

    void resetPassword(
            String email,
            String password
    );
}