package com.vrm.backend.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

// The 255 limits match varchar(255) columns. Bio and experience descriptions are TEXT
// columns with no real limit, so theirs are just generous sanity caps.
@Getter
@Setter
public class UpdateUserInfoDto {
    @Size(max = 255, message = "Headline must be 255 characters or fewer")
    private String headline;

    @Size(max = 20000, message = "Bio must be 20,000 characters or fewer")
    private String bio;

    @Size(max = 255, message = "Location must be 255 characters or fewer")
    private String location;

    @Size(max = 255, message = "Affiliated college must be 255 characters or fewer")
    private String university;

    @Size(max = 255, message = "Department must be 255 characters or fewer")
    private String department;

    @Size(max = 255, message = "GitHub link must be 255 characters or fewer")
    private String githubUrl;

    @Size(max = 255, message = "LinkedIn link must be 255 characters or fewer")
    private String linkedinUrl;

    @Size(max = 255, message = "Website link must be 255 characters or fewer")
    private String websiteUrl;

    private List<@Size(max = 255, message = "Each skill must be 255 characters or fewer") String> skills;

    private List<@Valid ExperienceDto> experiences;

    @Getter
    @Setter
    public static class ExperienceDto {
        @Size(max = 255, message = "Experience title must be 255 characters or fewer")
        private String title;

        @Size(max = 255, message = "Experience company must be 255 characters or fewer")
        private String company;

        @Size(max = 255, message = "Experience start date must be 255 characters or fewer")
        private String beginDate;

        @Size(max = 255, message = "Experience end date must be 255 characters or fewer")
        private String endDate;

        @Size(max = 20000, message = "Experience description must be 20,000 characters or fewer")
        private String description;
    }
}
