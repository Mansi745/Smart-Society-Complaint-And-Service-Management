package com.smartsociety.smart_society_portal.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @Column(length = 2000)
    private String description;

    private String category;

    private String priority;

    private String status;

    private LocalDateTime createdAt;

    // =====================================================
    // RESIDENT WHO RAISED THE COMPLAINT
    // =====================================================

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // =====================================================
    // STAFF ASSIGNED BY ADMIN
    // =====================================================

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff assignedStaff;

    // =====================================================
    // PRE PERSIST
    // =====================================================

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

        if (status == null || status.trim().isEmpty()) {
            status = "Pending";
        }
    }

    public Staff getAssignedStaff() {
        return assignedStaff;
    }

    public void setAssignedStaff(Staff assignedStaff) {
        this.assignedStaff = assignedStaff;
    }
}