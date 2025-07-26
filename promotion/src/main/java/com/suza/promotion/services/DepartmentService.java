package com.suza.promotion.services;

import com.suza.promotion.dto.DepartmentDTO;
import com.suza.promotion.entity.Department;
import com.suza.promotion.entity.School;
import com.suza.promotion.exception.ResourceNotFoundException;
import com.suza.promotion.repository.DepartmentRepository;
import com.suza.promotion.repository.SchoolRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final SchoolRepository schoolRepository;

    public DepartmentService(DepartmentRepository departmentRepository, SchoolRepository schoolRepository) {
        this.departmentRepository = departmentRepository;
        this.schoolRepository = schoolRepository;
    }

    public DepartmentDTO createDepartment(DepartmentDTO dto) {
        School school = schoolRepository.findById(dto.getSchoolId())
                .orElseThrow(() -> new ResourceNotFoundException("School not found"));

        Department dept = new Department();
        dept.setName(dto.getName());
        dept.setSchool(school);

        return convertToDTO(departmentRepository.save(dept));
    }

    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DepartmentDTO getDepartmentById(Long id) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        return convertToDTO(dept);
    }

    public List<DepartmentDTO> getDepartmentsBySchool(Long schoolId) {
        return departmentRepository.findBySchoolId(schoolId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DepartmentDTO updateDepartment(Long id, DepartmentDTO dto) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        School school = schoolRepository.findById(dto.getSchoolId())
                .orElseThrow(() -> new ResourceNotFoundException("School not found"));

        dept.setName(dto.getName());
        dept.setSchool(school);

        return convertToDTO(departmentRepository.save(dept));
    }

    public void deleteDepartment(Long id) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        departmentRepository.delete(dept);
    }

    private DepartmentDTO convertToDTO(Department dept) {
        DepartmentDTO dto = new DepartmentDTO();
        dto.setId(dept.getId());
        dto.setName(dept.getName());
        dto.setSchoolId(dept.getSchool().getId());
        dto.setSchoolName(dept.getSchool().getName());
        return dto;
    }
}

