package com.vrm.backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserInfoDto {
    private String headline;
    private String bio;
    private String location;
    private String university;
    private String department;
    private String githubUrl;
    private String linkedinUrl;
    private String websiteUrl;
    private List<String> skills;
    private List<EducationDto> education;

    @Getter
    @Setter
    public static class EducationDto {
        private String degree;
        private String institution;
        private String year;
    }
}
