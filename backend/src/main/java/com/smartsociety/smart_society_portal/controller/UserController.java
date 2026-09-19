package com.smartsociety.smart_society_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.smartsociety.smart_society_portal.dto.ResidentResponse;
import com.smartsociety.smart_society_portal.dto.ChangePasswordRequest;
import com.smartsociety.smart_society_portal.dto.LoginRequest;
import com.smartsociety.smart_society_portal.dto.LoginResponse;
import com.smartsociety.smart_society_portal.dto.StaffRegistrationRequest;
import com.smartsociety.smart_society_portal.entity.User;
import com.smartsociety.smart_society_portal.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;


    // =====================================================
    // REGISTER NORMAL USER / RESIDENT
    // =====================================================

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        return userService.registerUser(user);
    }


    // =====================================================
    // REGISTER STAFF
    // =====================================================

    @PostMapping("/register-staff")
    public User registerStaff(
            @RequestBody StaffRegistrationRequest request) {

        return userService.registerStaff(request);
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return userService.login(request);
    }


    // =====================================================
    // GET ALL USERS
    // =====================================================

    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }


    // =====================================================
    // GET ALL RESIDENTS
    // =====================================================

    @GetMapping("/residents")
    public List<ResidentResponse> getAllResidents() {

        return userService.getAllResidents()
                .stream()
                .map(ResidentResponse::fromUser)
                .toList();
    }


    // =====================================================
    // GET USER BY ID
    // =====================================================

    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable Long id) {

        return userService.getUserById(id);
    }


    // =====================================================
    // UPDATE USER
    // =====================================================

    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        return userService.updateUser(id, user);
    }


    // =====================================================
    // DELETE USER
    // =====================================================

    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return "User deleted successfully";
    }


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    @PutMapping("/{id}/change-password")
    public String changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest request) {

        return userService.changePassword(id, request);
    }
}