package com.suza.promotion.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
public class PromotionRequestDTO {
    private Long id;
    private String status;
    private LocalDateTime submissionDate;

    private String applicantName;
    private String departmentName;

    private String currentRank;
    private String appliedRank;
    private String schoolName;

    private String reviewerName;
    private String uploadedByName;
}

