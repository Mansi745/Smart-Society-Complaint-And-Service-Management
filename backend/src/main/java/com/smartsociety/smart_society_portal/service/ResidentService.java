package com.smartsociety.smart_society_portal.service;

import java.util.List;

import com.smartsociety.smart_society_portal.entity.Resident;

public interface ResidentService {

    Resident addResident(Resident resident);

    List<Resident> getAllResidents();

    Resident getResidentById(Long id);

    Resident updateResident(Long id, Resident resident);

    void deleteResident(Long id);

    List<Resident> searchResident(String keyword);
}