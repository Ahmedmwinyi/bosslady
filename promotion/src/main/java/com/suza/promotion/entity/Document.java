package com.suza.promotion.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "promotion_request_id", nullable = false)
    private PromotionRequest promotionRequest;

    @NotBlank
    @Column(name = "original_name", nullable = false)
    private String originalName;

    @NotBlank
    @Column(name = "stored_name", nullable = false)
    private String storedName;

    @NotBlank
    @Column(name = "file_path", nullable = false)
    private String filePath;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "content_type")
    private String contentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_type")
    private DocumentType documentType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;

    @CreationTimestamp
    @Column(name = "uploaded_at", updatable = false)
    private LocalDateTime uploadedAt;

    // Constructors
    public Document() {}

    public Document(PromotionRequest promotionRequest, String originalName, String storedName,
                   String filePath, Long fileSize, String contentType, User uploadedBy) {
        this.promotionRequest = promotionRequest;
        this.originalName = originalName;
        this.storedName = storedName;
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.contentType = contentType;
        this.uploadedBy = uploadedBy;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PromotionRequest getPromotionRequest() { return promotionRequest; }
    public void setPromotionRequest(PromotionRequest promotionRequest) { this.promotionRequest = promotionRequest; }

    public String getOriginalName() { return originalName; }
    public void setOriginalName(String originalName) { this.originalName = originalName; }

    public String getStoredName() { return storedName; }
    public void setStoredName(String storedName) { this.storedName = storedName; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public DocumentType getDocumentType() { return documentType; }
    public void setDocumentType(DocumentType documentType) { this.documentType = documentType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public User getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(User uploadedBy) { this.uploadedBy = uploadedBy; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public enum DocumentType {
        CV, PUBLICATIONS, RECOMMENDATION_LETTER, TEACHING_EVALUATION, 
        RESEARCH_PROPOSAL, CONTRACT, CERTIFICATE, OTHER
    }
}