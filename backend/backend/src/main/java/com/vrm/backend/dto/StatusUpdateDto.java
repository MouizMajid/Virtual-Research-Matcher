package com.vrm.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusUpdateDto {
    @NotBlank(message = "Status is required")
    private String status;
}
