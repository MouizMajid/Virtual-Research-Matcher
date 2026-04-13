package com.vrm.backend.responses;

import java.time.LocalDate;

import com.vrm.backend.model.Posting;

import lombok.Getter;

@Getter
public class PostingResponse {
    private Long id;
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
    private String createdByUser;
    private Long createdById;

    public PostingResponse(Posting posting) {
        this.id = posting.getId();
        this.type = posting.getType();
        this.title = posting.getTitle();
        this.description = posting.getDescription();
        this.location = posting.getLocation();
        this.openPositions = posting.getOpenPositions();
        this.stipend = posting.getStipend();
        this.duration = posting.getDuration();
        this.applicationDeadline = posting.getApplicationDeadline();
        this.requirements = posting.getRequirements();
        this.category = posting.getCategory();
        this.tags = posting.getTags();
        this.createdByUser = posting.getCreatedBy().getFirstName() + " " + posting.getCreatedBy().getLastName();
        this.createdById = posting.getCreatedBy().getId();
    }
}
