package com.suza.promotion.controller;

import com.suza.promotion.dto.SchoolDTO;
import com.suza.promotion.services.SchoolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schools")
public class SchoolController {

    private final SchoolService schoolService;

    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @PostMapping
    public ResponseEntity<SchoolDTO> createSchool(@RequestBody SchoolDTO schoolDTO) {
        return ResponseEntity.ok(schoolService.createSchool(schoolDTO));
    }

    @GetMapping
    public ResponseEntity<List<SchoolDTO>> getAllSchools() {
        return ResponseEntity.ok(schoolService.getAllSchools());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchoolDTO> getSchoolById(@PathVariable Long id) {
        return ResponseEntity.ok(schoolService.getSchoolById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchoolDTO> updateSchool(@PathVariable Long id, @RequestBody SchoolDTO schoolDTO) {
        return ResponseEntity.ok(schoolService.updateSchool(id, schoolDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchool(@PathVariable Long id) {
        schoolService.deleteSchool(id);
        return ResponseEntity.noContent().build();
    }
}
