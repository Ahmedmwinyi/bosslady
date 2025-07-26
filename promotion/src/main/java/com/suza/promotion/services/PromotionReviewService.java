package com.suza.promotion.services;

import com.suza.promotion.dto.PromotionReviewDTO;
import com.suza.promotion.entity.PromotionRequest;
import com.suza.promotion.entity.PromotionReview;
import com.suza.promotion.entity.User;
import com.suza.promotion.exception.ResourceNotFoundException;
import com.suza.promotion.repository.PromotionReviewRepository;
import com.suza.promotion.repository.PromotionRequestRepository;
import com.suza.promotion.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionReviewService {
    private final PromotionReviewRepository reviewRepository;
    private final PromotionRequestRepository requestRepository;
    private final UserRepository userRepository;

    public PromotionReviewService(PromotionReviewRepository reviewRepository, PromotionRequestRepository requestRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
    }

    // Create or update a review (approve or reject)
    public PromotionReviewDTO createOrUpdateReview(PromotionReviewDTO dto) {
        // Validate input IDs
        if (dto.getPromotionRequestId() == null || dto.getReviewerId() == null) {
            throw new IllegalArgumentException("PromotionRequestId and ReviewerId must be provided");
        }

        PromotionRequest request = requestRepository.findById(dto.getPromotionRequestId())
                .orElseThrow(() -> new ResourceNotFoundException("PromotionRequest not found"));

        User reviewer = userRepository.findById(dto.getReviewerId())
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer not found"));

        // Check if review exists for this reviewer and request (update), else create new
        PromotionReview review = reviewRepository
                .findByPromotionRequestAndReviewer(request, reviewer)
                .orElse(new PromotionReview());

        review.setPromotionRequest(request);
        review.setReviewer(reviewer);
        review.setReviewerRole(reviewer.getRole());
        review.setComments(dto.getComments());
        review.setDecision(PromotionReview.Decision.valueOf(dto.getDecision().toUpperCase()));
        review.setReviewDate(LocalDateTime.now());

        PromotionReview savedReview = reviewRepository.save(review);

        // Handle approval flow only if approved
        if (savedReview.getDecision() == PromotionReview.Decision.APPROVED) {
            advanceApproval(request, reviewer.getRole());
        } else if (savedReview.getDecision() == PromotionReview.Decision.REJECTED) {
            request.setStatus(PromotionRequest.Status.REJECTED);
            requestRepository.save(request);
        }

        return convertToDTO(savedReview);
    }

    private void advanceApproval(PromotionRequest request, User.Role currentRole) {
        switch (currentRole) {
            case HOD:
                request.setStatus(PromotionRequest.Status.UNDER_DEAN_REVIEW);
                break;
            case DEAN:
                request.setStatus(PromotionRequest.Status.UNDER_DVC_REVIEW);
                break;
            case DVC:
                request.setStatus(PromotionRequest.Status.APPROVED);
                break;
            default:
                throw new IllegalStateException("Unknown role for approval flow: " + currentRole);
        }
        requestRepository.save(request);
    }

    // Get review by ID
    public PromotionReviewDTO getReview(Long id) {
        PromotionReview review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PromotionReview not found"));
        return convertToDTO(review);
    }

    // List all reviews
    public List<PromotionReviewDTO> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Delete a review by ID
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ResourceNotFoundException("PromotionReview not found");
        }
        reviewRepository.deleteById(id);
    }

    // Find reviews by reviewer
    public List<PromotionReviewDTO> findByReviewer(Long reviewerId) {
        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer not found"));
        return reviewRepository.findByReviewer(reviewer).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Find reviews by promotion request
    public List<PromotionReviewDTO> findByPromotionRequest(Long requestId) {
        PromotionRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("PromotionRequest not found"));
        return reviewRepository.findByPromotionRequest(request).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Find reviews by decision
    public List<PromotionReviewDTO> findByDecision(String decisionStr) {
        PromotionReview.Decision decision;
        try {
            decision = PromotionReview.Decision.valueOf(decisionStr.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Invalid decision value: " + decisionStr);
        }
        return reviewRepository.findByDecision(decision).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PromotionReviewDTO convertToDTO(PromotionReview review) {
        PromotionReviewDTO dto = new PromotionReviewDTO();
        dto.setId(review.getId());
        dto.setPromotionRequestId(review.getPromotionRequest().getId());
        dto.setReviewerId(review.getReviewer().getId());
        dto.setReviewerName(review.getReviewer().getFullName());
        dto.setReviewerRole(review.getReviewerRole().name());
        dto.setDecision(review.getDecision().name());
        dto.setComments(review.getComments());
        dto.setReviewDate(review.getReviewDate());
        return dto;
    }
}
