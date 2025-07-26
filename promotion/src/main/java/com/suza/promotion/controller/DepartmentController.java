package com.suza.promotion.controller;

import com.suza.promotion.dto.DepartmentDTO;
import com.suza.promotion.services.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    public ResponseEntity<DepartmentDTO> create(@RequestBody DepartmentDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(departmentService.createDepartment(dto));
    }

    @GetMapping
    public List<DepartmentDTO> getAll() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @GetMapping("/school/{schoolId}")
    public List<DepartmentDTO> getBySchool(@PathVariable Long schoolId) {
        return departmentService.getDepartmentsBySchool(schoolId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDTO> update(@PathVariable Long id, @RequestBody DepartmentDTO dto) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }
}

