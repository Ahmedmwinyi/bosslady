package com.suza.promotion.services;

import com.suza.promotion.dto.PromotionRequestDTO;
import com.suza.promotion.entity.PromotionRequest;
import com.suza.promotion.entity.User;
import com.suza.promotion.exception.ResourceNotFoundException;
import com.suza.promotion.repository.PromotionRequestRepository;
import com.suza.promotion.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionRequestService {

    private final PromotionRequestRepository promotionRequestRepository;
    private final UserRepository userRepository;

    public PromotionRequestService(PromotionRequestRepository promotionRequestRepository,
                                   UserRepository userRepository) {
        this.promotionRequestRepository = promotionRequestRepository;
        this.userRepository = userRepository;
    }

    public PromotionRequestDTO createRequest(PromotionRequestDTO requestDTO, Long applicantId) {
        User applicant = userRepository.findById(applicantId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (applicant.getDepartment() == null) {
            throw new IllegalStateException("Applicant has no Department assigned");
        }
        if (applicant.getSchool() == null) {
            throw new IllegalStateException("Applicant has no School assigned");
        }

        PromotionRequest request = new PromotionRequest();
        request.setApplicant(applicant);
        request.setDepartment(applicant.getDepartment());
        request.setSchool(applicant.getSchool());
        request.setCurrentRank(requestDTO.getCurrentRank());
        request.setAppliedRank(requestDTO.getAppliedRank());
        request.setStatus(PromotionRequest.Status.DRAFT);

        PromotionRequest savedRequest = promotionRequestRepository.save(request);
        return convertToDTO(savedRequest);
    }

    public PromotionRequestDTO getRequestById(Long id) {
        PromotionRequest request = promotionRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion request not found"));
        return convertToDTO(request);
    }

    public List<PromotionRequestDTO> getRequestsByApplicant(Long applicantId) {
        return promotionRequestRepository.findByApplicantId(applicantId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PromotionRequestDTO> getRequestsByStatus(String status) {
        return promotionRequestRepository.findByStatus(PromotionRequest.Status.valueOf(status)).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PromotionRequestDTO> getRequestsByDepartment(Long departmentId) {
        return promotionRequestRepository.findByDepartmentId(departmentId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PromotionRequestDTO> getRequestsBySchool(Long schoolId) {
        return promotionRequestRepository.findBySchoolId(schoolId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PromotionRequestDTO updateRequest(Long requestId, PromotionRequestDTO dto) {
        PromotionRequest request = promotionRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        request.setCurrentRank(dto.getCurrentRank());
        request.setAppliedRank(dto.getAppliedRank());

        return convertToDTO(promotionRequestRepository.save(request));
    }

    public void deleteRequest(Long id) {
        PromotionRequest request = promotionRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        promotionRequestRepository.delete(request);
    }

    public PromotionRequestDTO submitRequest(Long requestId) {
        PromotionRequest request = promotionRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        request.setStatus(PromotionRequest.Status.SUBMITTED);
        request.setSubmissionDate(LocalDate.now().atStartOfDay());

        // Notify HoD via email or notification system here

        return convertToDTO(promotionRequestRepository.save(request));
    }

    private PromotionRequestDTO convertToDTO(PromotionRequest request) {
        PromotionRequestDTO dto = new PromotionRequestDTO();
        dto.setId(request.getId());
        dto.setStatus(request.getStatus().name());
        dto.setSubmissionDate(request.getSubmissionDate());
        dto.setApplicantName(request.getApplicant().getFullName());
        dto.setCurrentRank(request.getCurrentRank());
        dto.setAppliedRank(request.getAppliedRank());
        dto.setDepartmentName(request.getDepartment().getName());
        dto.setSchoolName(request.getSchool().getName());
        return dto;
    }
}
