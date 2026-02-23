package com.vrm.backend.responses;

import com.vrm.backend.model.Posting;

import lombok.Getter;

@Getter
public class PostingResponse {
    private Long id;
    private String title;
    private String shortDescription;
    private String createdByUser;
    public PostingResponse(Posting posting) {
        this.id = posting.getId();
        this.title = posting.getTitle();
        this.shortDescription = posting.getShortDescription();
        this.createdByUser = posting.getCreatedBy().getUsername();
    }
    
}
