package com.smartsociety.smart_society_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.entity.Notification;
import com.smartsociety.smart_society_portal.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;


    // =====================================================
    // GET USER NOTIFICATIONS
    // =====================================================

    @GetMapping("/user/{userId}")
    public List<Notification> getUserNotifications(
            @PathVariable Long userId
    ) {

        return notificationService
                .getNotificationsByUser(userId);
    }


    // =====================================================
    // MARK AS READ
    // =====================================================

    @PutMapping("/{id}/read")
    public Notification markAsRead(
            @PathVariable Long id
    ) {

        return notificationService.markAsRead(id);
    }


    // =====================================================
    // DELETE
    // =====================================================

    @DeleteMapping("/{id}")
    public String deleteNotification(
            @PathVariable Long id
    ) {

        notificationService.deleteNotification(id);

        return "Notification deleted successfully";
    }


    // =====================================================
    // UNREAD COUNT
    // =====================================================

    @GetMapping("/user/{userId}/unread-count")
    public long getUnreadCount(
            @PathVariable Long userId
    ) {

        return notificationService
                .getUnreadCount(userId);
    }
}