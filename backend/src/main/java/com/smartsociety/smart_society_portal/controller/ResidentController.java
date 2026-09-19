package com.smartsociety.smart_society_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.entity.Resident;
import com.smartsociety.smart_society_portal.service.ResidentService;

@RestController
@RequestMapping("/api/residents")
@CrossOrigin(origins = "http://localhost:5173")
public class ResidentController {

    @Autowired
    private ResidentService residentService;

    @PostMapping
    public Resident addResident(
            @RequestBody Resident resident) {
        return residentService.addResident(resident);
    }

    @GetMapping
    public List<Resident> getAllResidents() {
        return residentService.getAllResidents();
    }

    @GetMapping("/{id}")
    public Resident getResidentById(
            @PathVariable Long id) {
        return residentService.getResidentById(id);
    }

    @PutMapping("/{id}")
    public Resident updateResident(
            @PathVariable Long id,
            @RequestBody Resident resident) {

        return residentService.updateResident(id, resident);
    }

    @DeleteMapping("/{id}")
    public void deleteResident(
            @PathVariable Long id) {

        residentService.deleteResident(id);
    }

    @GetMapping("/search")
    public List<Resident> searchResident(
            @RequestParam String keyword) {

        return residentService.searchResident(keyword);
    }
}