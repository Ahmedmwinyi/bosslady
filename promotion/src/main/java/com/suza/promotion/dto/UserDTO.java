package com.suza.promotion.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String role;

    private String departmentName;
    private String schoolName;
}

