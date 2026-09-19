package com.smartsociety.smart_society_portal.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String message;

    private String type;

    @Column(name = "`read`", nullable = false)
    private boolean read = false;

    // =====================================================
    // USER WHO RECEIVES NOTIFICATION
    // =====================================================

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public Notification() {
    }


    public Notification(
            Long id,
            String title,
            String message,
            String type
    ) {

        this.id = id;
        this.title = title;
        this.message = message;
        this.type = type;
        this.read = false;
    }


    public Notification(
            Long id,
            String title,
            String message,
            String type,
            User user
    ) {

        this.id = id;
        this.title = title;
        this.message = message;
        this.type = type;
        this.user = user;
        this.read = false;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}