package com.suza.promotion.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserProfileDTO {
    private Long id;
    private String fullName;
    private String email;
    private String role;

}

