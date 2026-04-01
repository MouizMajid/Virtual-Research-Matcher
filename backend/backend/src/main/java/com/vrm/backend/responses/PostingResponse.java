package com.vrm.backend.responses;

import java.time.LocalDate;

import com.vrm.backend.model.Posting;

import lombok.Getter;

@Getter
public class PostingResponse {
    private Long id;
    private Posting.Type type;
    private String title;
    private String shortDescription;
    private String longDescription;
    private String location;
    private boolean remote;
    private int positionsAvailable;
    private float stipend;
    private String length;
    private LocalDate applicationDeadline;
    private String requirements;
    private String[] tags;
    private String createdByUser;
    private Long createdById;

    public PostingResponse(Posting posting) {
        this.id = posting.getId();
        this.type = posting.getType();
        this.title = posting.getTitle();
        this.shortDescription = posting.getShortDescription();
        this.longDescription = posting.getLongDescription();
        this.location = posting.getLocation();
        this.remote = posting.isRemote();
        this.positionsAvailable = posting.getPositionsAvailable();
        this.stipend = posting.getStipend();
        this.length = posting.getLength();
        this.applicationDeadline = posting.getApplicationDeadline();
        this.requirements = posting.getRequirements();
        this.tags = posting.getTags();
        this.createdByUser = posting.getCreatedBy().getUsername();
        this.createdById = posting.getCreatedBy().getId();
    }
}
