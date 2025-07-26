package com.suza.promotion.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class PromotionReviewDTO {
    private Long id;
    private Long promotionRequestId;
    private Long reviewerId;

    private String reviewerName;  // For response only
    private String reviewerRole;  // For response only

    private String decision;      // "APPROVED" or "REJECTED"
    private String comments;
    private LocalDateTime reviewDate;
}
