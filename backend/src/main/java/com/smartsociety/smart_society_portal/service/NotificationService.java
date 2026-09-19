package com.smartsociety.smart_society_portal.service;

import java.util.List;

import com.smartsociety.smart_society_portal.entity.Notification;

public interface NotificationService {

    Notification addNotification(Notification notification);

    List<Notification> getNotificationsByUser(Long userId);

    Notification markAsRead(Long id);

    void deleteNotification(Long id);

    long getUnreadCount(Long userId);
}