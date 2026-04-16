package com.vrm.backend.responses;

import java.time.LocalDateTime;

import com.vrm.backend.model.Application;

import lombok.Getter;

@Getter
public class ApplicationResponse {
    private Long id;
    private String coverLetter;
    private String why;
    private String experience;
    private Long postingId;
    private String postingTitle;
    private Application.Status status;
    private Long applicantId;
    private String applicantFirstName;
    private String applicantLastName;
    private String applicantEmail;
    private LocalDateTime createdAt;

    public ApplicationResponse(Application application) {
        this.id = application.getId();
        this.coverLetter = application.getCoverLetter();
        this.why = application.getWhy();
        this.experience = application.getExperience();
        this.postingId = application.getPosting().getId();
        this.postingTitle = application.getPosting().getTitle();
        this.status = application.getStatus();
        this.applicantId = application.getApplicant().getId();
        this.applicantFirstName = application.getApplicant().getFirstName();
        this.applicantLastName = application.getApplicant().getLastName();
        this.applicantEmail = application.getApplicant().getEmail();
        this.createdAt = application.getCreatedAt();
    }
}
