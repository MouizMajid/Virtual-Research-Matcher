package com.vrm.backend.responses;

import java.util.List;
import java.util.stream.Collectors;

import com.vrm.backend.model.Education;
import com.vrm.backend.model.UserInfo;

import lombok.Getter;

@Getter
public class UserInfoResponse {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String headline;
    private String bio;
    private String location;
    private String university;
    private String department;
    private String githubUrl;
    private String linkedinUrl;
    private String websiteUrl;
    private List<String> skills;
    private List<EducationItem> education;

    public UserInfoResponse(UserInfo userInfo) {
        this.id = userInfo.getId();
        this.userId = userInfo.getUser().getId();
        this.firstName = userInfo.getUser().getFirstName();
        this.lastName = userInfo.getUser().getLastName();
        this.email = userInfo.getUser().getEmail();
        this.role = userInfo.getUser().getRole().name();
        this.headline = userInfo.getHeadline();
        this.bio = userInfo.getBio();
        this.location = userInfo.getLocation();
        this.university = userInfo.getUniversity();
        this.department = userInfo.getDepartment();
        this.githubUrl = userInfo.getGithubUrl();
        this.linkedinUrl = userInfo.getLinkedinUrl();
        this.websiteUrl = userInfo.getWebsiteUrl();
        this.skills = userInfo.getSkills();
        this.education = userInfo.getEducation().stream()
                .map(EducationItem::new)
                .collect(Collectors.toList());
    }

    @Getter
    public static class EducationItem {
        private Long id;
        private String degree;
        private String institution;
        private String year;

        public EducationItem(Education education) {
            this.id = education.getId();
            this.degree = education.getDegree();
            this.institution = education.getInstitution();
            this.year = education.getYear();
        }
    }
}
