package com.vrm.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationDto {
    @NotNull(message = "Posting ID is required")
    private Long postingId;

    @NotBlank(message = "Cover letter is required")
    private String coverLetter;

    @NotBlank(message = "Please explain why you are interested")
    private String why;

    @NotBlank(message = "Please describe your relevant experience")
    private String experience;
}
