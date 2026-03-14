package com.vrm.backend.responses;



import com.vrm.backend.model.Application;

import lombok.Getter;


@Getter
public class ApplicationResponse {
    private Long id;
    private String coverLetter;
    private String resumeLink;
    private String why;
    private String experience;
    private Long postingId;

    public ApplicationResponse(Application application) {
        this.id = application.getId();
        this.coverLetter = application.getCoverLetter();
        this.resumeLink = application.getResumeLink();
        this.why = application.getWhy();
        this.experience = application.getExperience();
        this.postingId = application.getPosting().getId();
    }
    
}
