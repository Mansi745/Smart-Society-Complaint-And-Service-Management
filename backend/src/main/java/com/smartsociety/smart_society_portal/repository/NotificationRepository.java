package com.smartsociety.smart_society_portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartsociety.smart_society_portal.entity.Notification;

@Repository
public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification>
    findByUser_IdOrderByIdDesc(Long userId);

    long countByUser_IdAndReadFalse(Long userId);
}