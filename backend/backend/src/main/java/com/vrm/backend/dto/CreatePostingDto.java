package com.vrm.backend.dto;

import java.time.LocalDate;

import com.vrm.backend.model.Posting;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostingDto {
    private Posting.Type type;
    private String title;
    private String description;

    private String location;

    private String duration;
    private String category;
    private int openPositions;

    private String requirements;
    private LocalDate applicationDeadline;
    private float stipend;
    private String[] tags;

}


