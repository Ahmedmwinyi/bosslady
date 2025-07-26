package com.suza.promotion.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DocumentDTO {
    private Long id;
    private String filename;
    private String type;
    private String uploaderName;
}

