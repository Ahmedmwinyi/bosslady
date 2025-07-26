package com.suza.promotion.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "promotion_requests")
public class PromotionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id", nullable = false)
    private User applicant;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @NotBlank
    @Column(name = "current_rank", nullable = false)
    private String currentRank;

    @NotBlank
    @Column(name = "applied_rank", nullable = false)
    private String appliedRank;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.DRAFT;

    @Column(columnDefinition = "TEXT")
    private String justification;

    @Column(name = "submission_date")
    private LocalDateTime submissionDate;

    @Column(name = "hod_review_date")
    private LocalDateTime hodReviewDate;

    @Column(name = "dean_review_date")
    private LocalDateTime deanReviewDate;

    @Column(name = "dvc_decision_date")
    private LocalDateTime dvcDecisionDate;

    @Column(name = "final_decision")
    private String finalDecision;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "promotionRequest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PromotionReview> reviews;

    @OneToMany(mappedBy = "promotionRequest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Document> documents;

    @OneToMany(mappedBy = "promotionRequest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Notification> notifications;

    // Constructors
    public PromotionRequest() {}

    public PromotionRequest(User applicant, Department department, School school, 
                           String currentRank, String appliedRank) {
        this.applicant = applicant;
        this.department = department;
        this.school = school;
        this.currentRank = currentRank;
        this.appliedRank = appliedRank;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getApplicant() { return applicant; }
    public void setApplicant(User applicant) { this.applicant = applicant; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public School getSchool() { return school; }
    public void setSchool(School school) { this.school = school; }

    public String getCurrentRank() { return currentRank; }
    public void setCurrentRank(String currentRank) { this.currentRank = currentRank; }

    public String getAppliedRank() { return appliedRank; }
    public void setAppliedRank(String appliedRank) { this.appliedRank = appliedRank; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public String getJustification() { return justification; }
    public void setJustification(String justification) { this.justification = justification; }

    public LocalDateTime getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(LocalDateTime submissionDate) { this.submissionDate = submissionDate; }

    public LocalDateTime getHodReviewDate() { return hodReviewDate; }
    public void setHodReviewDate(LocalDateTime hodReviewDate) { this.hodReviewDate = hodReviewDate; }

    public LocalDateTime getDeanReviewDate() { return deanReviewDate; }
    public void setDeanReviewDate(LocalDateTime deanReviewDate) { this.deanReviewDate = deanReviewDate; }

    public LocalDateTime getDvcDecisionDate() { return dvcDecisionDate; }
    public void setDvcDecisionDate(LocalDateTime dvcDecisionDate) { this.dvcDecisionDate = dvcDecisionDate; }

    public String getFinalDecision() { return finalDecision; }
    public void setFinalDecision(String finalDecision) { this.finalDecision = finalDecision; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<PromotionReview> getReviews() { return reviews; }
    public void setReviews(List<PromotionReview> reviews) { this.reviews = reviews; }

    public List<Document> getDocuments() { return documents; }
    public void setDocuments(List<Document> documents) { this.documents = documents; }

    public List<Notification> getNotifications() { return notifications; }
    public void setNotifications(List<Notification> notifications) { this.notifications = notifications; }

    public enum Status {
        DRAFT, SUBMITTED, APPROVED, REJECTED, HOD_REVIEWED, DEAN_REVIEWED, UNDER_DEAN_REVIEW, UNDER_DVC_REVIEW, DVC_APPROVED, DVC_REJECTED, DVC_REVIEWED
    }
}