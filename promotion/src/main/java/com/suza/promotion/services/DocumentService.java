package com.suza.promotion.services;

import com.suza.promotion.dto.DocumentDTO;
import com.suza.promotion.entity.Document;
import com.suza.promotion.entity.PromotionRequest;
import com.suza.promotion.entity.User;
import com.suza.promotion.exception.ResourceNotFoundException;
import com.suza.promotion.repository.DocumentRepository;
import com.suza.promotion.repository.PromotionRequestRepository;
import com.suza.promotion.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;
    private final PromotionRequestRepository promotionRequestRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public DocumentService(DocumentRepository documentRepository,
                           PromotionRequestRepository promotionRequestRepository,
                           UserRepository userRepository) {
        this.documentRepository = documentRepository;
        this.promotionRequestRepository = promotionRequestRepository;
        this.userRepository = userRepository;
    }

    public DocumentDTO uploadDocument(MultipartFile file, Long requestId, Long userId,
                                      String documentType, String description) throws IOException {
        PromotionRequest request = promotionRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion Request not found"));
        User uploadedBy = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String storedName = generateStoredName(file.getOriginalFilename());
        String filePath = uploadDir + File.separator + storedName;
        File dest = new File(filePath);

// Create directories if they don't exist
        File parentDir = dest.getParentFile();
        if (!parentDir.exists()) {
            parentDir.mkdirs(); // Creates necessary folders
        }

        file.transferTo(dest);


        Document document = new Document();
        document.setPromotionRequest(request);
        document.setOriginalName(file.getOriginalFilename());
        document.setStoredName(storedName);
        document.setFilePath(filePath);
        document.setFileSize(file.getSize());
        document.setContentType(file.getContentType());
        document.setDocumentType(Document.DocumentType.valueOf(documentType));
        document.setDescription(description);
        document.setUploadedBy(uploadedBy);
        document.setUploadedAt(LocalDateTime.now());

        return convertToDTO(documentRepository.save(document));
    }

    public byte[] downloadFile(Long documentId) throws IOException {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        return Files.readAllBytes(new File(document.getFilePath()).toPath());
    }

    public List<DocumentDTO> getDocumentsByRequest(Long requestId) {
        return documentRepository.findByPromotionRequestId(requestId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DocumentDTO> getDocumentsByUploader(Long userId) {
        return documentRepository.findByUploadedById(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DocumentDTO> getDocumentsByType(String documentType) {
        return documentRepository.findByDocumentType(Document.DocumentType.valueOf(documentType)).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void deleteDocument(Long id) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));

        File file = new File(doc.getFilePath());
        if (file.exists()) file.delete();

        documentRepository.delete(doc);
    }

    private String generateStoredName(String originalName) {
        return System.currentTimeMillis() + "_" + originalName.replaceAll("\\s+", "_");
    }

    private DocumentDTO convertToDTO(Document document) {
        DocumentDTO dto = new DocumentDTO();
        dto.setId(document.getId());
        dto.setFilename(document.getOriginalName());
        dto.setType(document.getDocumentType().name());
        dto.setUploaderName(document.getUploadedBy().getFullName());
        return dto;
    }
}
