package com.suza.promotion.controller;

import com.suza.promotion.dto.DocumentDTO;
import com.suza.promotion.services.DocumentService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/upload")
    public DocumentDTO upload(@RequestParam("file") MultipartFile file,
                              @RequestParam("requestId") Long requestId,
                              @RequestParam("userId") Long userId,
                              @RequestParam("documentType") String documentType,
                              @RequestParam("description") String description) throws IOException {
        return documentService.uploadDocument(file, requestId, userId, documentType, description);
    }

    @GetMapping("/{id}/download")
    public void download(@PathVariable Long id, HttpServletResponse response) throws IOException {
        byte[] fileData = documentService.downloadFile(id);
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.getOutputStream().write(fileData);
        response.flushBuffer();
    }

    @GetMapping("/request/{requestId}")
    public List<DocumentDTO> getByRequest(@PathVariable Long requestId) {
        return documentService.getDocumentsByRequest(requestId);
    }

    @GetMapping("/uploader/{userId}")
    public List<DocumentDTO> getByUploader(@PathVariable Long userId) {
        return documentService.getDocumentsByUploader(userId);
    }

    @GetMapping("/type/{type}")
    public List<DocumentDTO> getByType(@PathVariable String type) {
        return documentService.getDocumentsByType(type);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        documentService.deleteDocument(id);
    }
}
