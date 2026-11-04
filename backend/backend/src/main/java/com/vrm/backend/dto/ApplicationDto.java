package com.vrm.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

// These are TEXT columns with no real limit, so the caps are just generous sanity limits.
@Getter
@Setter
public class ApplicationDto {
    @NotNull(message = "Posting ID is required")
    private Long postingId;

    @NotBlank(message = "Cover letter is required")
    @Size(max = 20000, message = "Cover letter must be 20,000 characters or fewer")
    private String coverLetter;

    @NotBlank(message = "Please explain why you are interested")
    @Size(max = 20000, message = "Your reason for applying must be 20,000 characters or fewer")
    private String why;

    @NotBlank(message = "Please describe your relevant experience")
    @Size(max = 20000, message = "Relevant experience must be 20,000 characters or fewer")
    private String experience;
}
