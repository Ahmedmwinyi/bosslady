package com.suza.promotion.controller;

import com.suza.promotion.dto.PromotionReviewDTO;
import com.suza.promotion.services.PromotionReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion-reviews")
public class PromotionReviewController {
    private final PromotionReviewService reviewService;

    public PromotionReviewController(PromotionReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<PromotionReviewDTO> createOrUpdateReview(@RequestBody PromotionReviewDTO dto) {
        PromotionReviewDTO savedReview = reviewService.createOrUpdateReview(dto);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromotionReviewDTO> getReview(@PathVariable Long id) {
        PromotionReviewDTO dto = reviewService.getReview(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<PromotionReviewDTO>> getAllReviews() {
        List<PromotionReviewDTO> list = reviewService.getAllReviews();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-reviewer/{reviewerId}")
    public ResponseEntity<List<PromotionReviewDTO>> getByReviewer(@PathVariable Long reviewerId) {
        List<PromotionReviewDTO> list = reviewService.findByReviewer(reviewerId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/by-request/{requestId}")
    public ResponseEntity<List<PromotionReviewDTO>> getByPromotionRequest(@PathVariable Long requestId) {
        List<PromotionReviewDTO> list = reviewService.findByPromotionRequest(requestId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/by-decision/{decision}")
    public ResponseEntity<List<PromotionReviewDTO>> getByDecision(@PathVariable String decision) {
        List<PromotionReviewDTO> list = reviewService.findByDecision(decision);
        return ResponseEntity.ok(list);
    }
}

