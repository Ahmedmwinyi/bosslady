package com.suza.promotion.controller;

import com.suza.promotion.dto.PromotionRequestDTO;
import com.suza.promotion.services.PromotionRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion-requests")
public class PromotionRequestController {

    private final PromotionRequestService promotionRequestService;

    public PromotionRequestController(PromotionRequestService promotionRequestService) {
        this.promotionRequestService = promotionRequestService;
    }

    @PostMapping("/{applicantId}")
    public ResponseEntity<PromotionRequestDTO> createRequest(@PathVariable Long applicantId,
                                                             @RequestBody PromotionRequestDTO dto) {
        return ResponseEntity.ok(promotionRequestService.createRequest(dto, applicantId));
    }

    @PutMapping("/{requestId}/submit")
    public ResponseEntity<PromotionRequestDTO> submitRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(promotionRequestService.submitRequest(requestId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromotionRequestDTO> getRequest(@PathVariable Long id) {
        return ResponseEntity.ok(promotionRequestService.getRequestById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromotionRequestDTO> updateRequest(@PathVariable Long id,
                                                             @RequestBody PromotionRequestDTO dto) {
        return ResponseEntity.ok(promotionRequestService.updateRequest(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        promotionRequestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/applicant/{applicantId}")
    public List<PromotionRequestDTO> getByApplicant(@PathVariable Long applicantId) {
        return promotionRequestService.getRequestsByApplicant(applicantId);
    }

    @GetMapping("/status/{status}")
    public List<PromotionRequestDTO> getByStatus(@PathVariable String status) {
        return promotionRequestService.getRequestsByStatus(status);
    }

    @GetMapping("/department/{deptId}")
    public List<PromotionRequestDTO> getByDepartment(@PathVariable Long deptId) {
        return promotionRequestService.getRequestsByDepartment(deptId);
    }

    @GetMapping("/school/{schoolId}")
    public List<PromotionRequestDTO> getBySchool(@PathVariable Long schoolId) {
        return promotionRequestService.getRequestsBySchool(schoolId);
    }
}
