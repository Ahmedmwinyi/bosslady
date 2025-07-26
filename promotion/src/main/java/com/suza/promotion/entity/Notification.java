package com.suza.promotion.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "promotion_request_id")
    private PromotionRequest promotionRequest;

    @NotBlank
    @Column(nullable = false)
    private String title;

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "is_email_sent")
    private Boolean isEmailSent = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "read_at")
    private LocalDateTime readAt;

    // Constructors
    public Notification() {}

    public Notification(User user, String title, String message, NotificationType type) {
        this.user = user;
        this.title = title;
        this.message = message;
        this.type = type;
    }

    public Notification(User user, PromotionRequest promotionRequest, String title, 
                       String message, NotificationType type) {
        this.user = user;
        this.promotionRequest = promotionRequest;
        this.title = title;
        this.message = message;
        this.type = type;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public PromotionRequest getPromotionRequest() { return promotionRequest; }
    public void setPromotionRequest(PromotionRequest promotionRequest) { this.promotionRequest = promotionRequest; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public NotificationType getType() { return type; }
    public void setType(NotificationType type) { this.type = type; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public Boolean getIsEmailSent() { return isEmailSent; }
    public void setIsEmailSent(Boolean isEmailSent) { this.isEmailSent = isEmailSent; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getReadAt() { return readAt; }
    public void setReadAt(LocalDateTime readAt) { this.readAt = readAt; }

    public enum NotificationType {
        APPLICATION_SUBMITTED("Application Submitted"),
        APPLICATION_REVIEWED("Application Reviewed"),
        APPLICATION_APPROVED("Application Approved"),
        APPLICATION_REJECTED("Application Rejected"),
        SYSTEM_NOTIFICATION("System Notification"),
        REMINDER("Reminder");

        private final String label;

        NotificationType(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }
    }

}