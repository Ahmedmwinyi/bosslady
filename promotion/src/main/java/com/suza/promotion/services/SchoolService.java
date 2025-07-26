package com.suza.promotion.services;

import com.suza.promotion.dto.SchoolDTO;
import com.suza.promotion.entity.School;
import com.suza.promotion.exception.ResourceNotFoundException;
import com.suza.promotion.repository.SchoolRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchoolService {
    private final SchoolRepository schoolRepository;

    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    public SchoolDTO createSchool(SchoolDTO schoolDTO) {
        School school = new School();
        school.setName(schoolDTO.getName());
        School savedSchool = schoolRepository.save(school);
        return convertToDTO(savedSchool);
    }

    public List<SchoolDTO> getAllSchools() {
        return schoolRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SchoolDTO getSchoolById(Long id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found"));
        return convertToDTO(school);
    }

    public SchoolDTO updateSchool(Long id, SchoolDTO schoolDTO) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found"));

        school.setName(schoolDTO.getName());
        School updated = schoolRepository.save(school);
        return convertToDTO(updated);
    }

    public void deleteSchool(Long id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found"));
        schoolRepository.delete(school);
    }

    private SchoolDTO convertToDTO(School school) {
        SchoolDTO dto = new SchoolDTO();
        dto.setId(school.getId());
        dto.setName(school.getName());
        return dto;
    }
}
