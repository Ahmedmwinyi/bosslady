package com.suza.promotion.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class DepartmentDTO {
    private Long id;
    private String name;
    private Long schoolId;
    private String schoolName;
}

