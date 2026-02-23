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
    private String shortDescription;
    private String longDescription;
    private String location;
    private boolean remote;
    private String length;
    private String requirements;
    private int positionsAvailable;
    private LocalDate applicationDeadline;
    private float stipend;
    private String[] tags;

}
