package com.smartsociety.smart_society_portal.dto;

public class LoginResponse {

    private Long userId;
    private Long staffId;
    private String message;
    private String role;
    private String fullName;
    private String profession;

    public LoginResponse() {
    }

    public LoginResponse(
            Long userId,
            Long staffId,
            String message,
            String role,
            String fullName,
            String profession
    ) {
        this.userId = userId;
        this.staffId = staffId;
        this.message = message;
        this.role = role;
        this.fullName = fullName;
        this.profession = profession;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }
}