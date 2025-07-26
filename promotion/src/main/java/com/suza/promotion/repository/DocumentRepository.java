package com.suza.promotion.repository;

import com.suza.promotion.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByPromotionRequestId(Long promotionRequestId);
    List<Document> findByUploadedById(Long uploadedById);
    List<Document> findByDocumentType(Document.DocumentType documentType);

}