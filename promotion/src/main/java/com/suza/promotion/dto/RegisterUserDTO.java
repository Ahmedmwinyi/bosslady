package com.suza.promotion.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterUserDTO {
    private String fullName;
    private String email;
    private String password;
    private String role; // e.g. "ACADEMIC_STAFF", "HR", "HOD", "DEAN", "DVC", "ADMIN"

}

