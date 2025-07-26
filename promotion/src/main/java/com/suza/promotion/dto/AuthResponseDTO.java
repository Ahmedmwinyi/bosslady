package com.suza.promotion.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthResponseDTO {
    private String accessToken;
    private String refreshToken;
    private String role;
    private String fullName;
    private Long userId;
}

