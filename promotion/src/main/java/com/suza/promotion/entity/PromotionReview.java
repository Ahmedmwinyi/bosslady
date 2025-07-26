package com.suza.promotion.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "promotion_reviews")
public class PromotionReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "promotion_request_id", nullable = false)
    private PromotionRequest promotionRequest;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id", nullable = false)
    private User reviewer;

    @Enumerated(EnumType.STRING)
    @Column(name = "reviewer_role", nullable = false)
    private User.Role reviewerRole;

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    private String comments;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Decision decision;

    @Column(name = "review_date")
    private LocalDateTime reviewDate;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public PromotionReview() {}

    public PromotionReview(PromotionRequest promotionRequest, User reviewer, 
                          String comments, Decision decision) {
        this.promotionRequest = promotionRequest;
        this.reviewer = reviewer;
        this.reviewerRole = reviewer.getRole();
        this.comments = comments;
        this.decision = decision;
        this.reviewDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PromotionRequest getPromotionRequest() { return promotionRequest; }
    public void setPromotionRequest(PromotionRequest promotionRequest) { this.promotionRequest = promotionRequest; }

    public User getReviewer() { return reviewer; }
    public void setReviewer(User reviewer) { this.reviewer = reviewer; }

    public User.Role getReviewerRole() { return reviewerRole; }
    public void setReviewerRole(User.Role reviewerRole) { this.reviewerRole = reviewerRole; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public Decision getDecision() { return decision; }
    public void setDecision(Decision decision) { this.decision = decision; }

    public LocalDateTime getReviewDate() { return reviewDate; }
    public void setReviewDate(LocalDateTime reviewDate) { this.reviewDate = reviewDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public enum Decision {
        APPROVED, REJECTED, RECOMMEND
    }
}