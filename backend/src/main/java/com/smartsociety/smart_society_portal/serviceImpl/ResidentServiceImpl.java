package com.smartsociety.smart_society_portal.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.entity.Resident;
import com.smartsociety.smart_society_portal.exception.ResourceNotFoundException;
import com.smartsociety.smart_society_portal.repository.ResidentRepository;
import com.smartsociety.smart_society_portal.service.ResidentService;

@Service
public class ResidentServiceImpl implements ResidentService {

    @Autowired
    private ResidentRepository residentRepository;

    @Override
    public Resident addResident(Resident resident) {
        return residentRepository.save(resident);
    }

    @Override
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    @Override
    public Resident getResidentById(Long id) {
        return residentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resident not found"));
    }

    @Override
    public Resident updateResident(Long id, Resident resident) {

        Resident existingResident = residentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resident not found"));

        existingResident.setName(resident.getName());
        existingResident.setEmail(resident.getEmail());
        existingResident.setMobile(resident.getMobile());
        existingResident.setFlat(resident.getFlat());

        return residentRepository.save(existingResident);
    }

    @Override
    public void deleteResident(Long id) {

        Resident resident = residentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resident not found"));

        residentRepository.delete(resident);
    }

    @Override
    public List<Resident> searchResident(String keyword) {
        return residentRepository.findByNameContainingIgnoreCase(keyword);
    }
}