package com.smartsociety.smart_society_portal.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.entity.Notification;
import com.smartsociety.smart_society_portal.exception.ResourceNotFoundException;
import com.smartsociety.smart_society_portal.repository.NotificationRepository;
import com.smartsociety.smart_society_portal.service.NotificationService;

@Service
public class NotificationServiceImpl
        implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;


    @Override
    public Notification addNotification(
            Notification notification
    ) {

        return notificationRepository.save(
                notification
        );
    }


    @Override
    public List<Notification> getNotificationsByUser(
            Long userId
    ) {

        return notificationRepository
                .findByUser_IdOrderByIdDesc(userId);
    }


    @Override
    public Notification markAsRead(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification not found"
                                )
                        );

        notification.setRead(true);

        return notificationRepository.save(
                notification
        );
    }


    @Override
    public void deleteNotification(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification not found"
                                )
                        );

        notificationRepository.delete(
                notification
        );
    }


    @Override
    public long getUnreadCount(Long userId) {

        return notificationRepository
                .countByUser_IdAndReadFalse(userId);
    }
}