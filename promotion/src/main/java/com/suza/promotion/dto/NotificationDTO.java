package com.suza.promotion.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class NotificationDTO {
    private Long id;
    private String message;
    private String title;
    private String type;
    private Boolean read;
    private LocalDateTime timestamp;
}

