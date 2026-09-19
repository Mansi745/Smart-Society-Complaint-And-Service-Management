package com.smartsociety.smart_society_portal.dto;

import com.smartsociety.smart_society_portal.entity.User;

public class ResidentResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String profession;
    private String role;

    public ResidentResponse() {
    }

    public ResidentResponse(
            Long id,
            String name,
            String email,
            String phone,
            String profession,
            String role
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.profession = profession;
        this.role = role;
    }

    public static ResidentResponse fromUser(User user) {

        return new ResidentResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getProfession(),
                user.getRole() != null
                        ? user.getRole().name()
                        : null
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}