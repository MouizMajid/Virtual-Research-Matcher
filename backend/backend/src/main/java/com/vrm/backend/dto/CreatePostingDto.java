package com.vrm.backend.dto;

import java.time.LocalDate;

import com.vrm.backend.model.Posting;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostingDto {
    @NotNull(message = "Posting type is required")
    private Posting.Type type;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    private String duration;

    @Min(value = 1, message = "Must have at least 1 open position")
    private int openPositions;

    private String requirements;
    private LocalDate applicationDeadline;
    private float stipend;
    private String[] tags;
}
