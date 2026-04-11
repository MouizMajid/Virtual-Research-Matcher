package com.vrm.backend.responses;

import java.util.List;
import java.util.stream.Collectors;

import com.vrm.backend.model.Experience;
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
    private List<ExperienceItem> experiences;

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
        this.experiences = userInfo.getExperiences().stream()
                .map(ExperienceItem::new)
                .collect(Collectors.toList());
    }

    @Getter
    public static class ExperienceItem {
        private Long id;
        private String title;
        private String company;
        private String beginDate;
        private String endDate;
        private String description;

        public ExperienceItem(Experience experience) {
            this.id = experience.getId();
            this.title = experience.getTitle();
            this.company = experience.getCompany();
            this.beginDate = experience.getBeginDate();
            this.endDate = experience.getEndDate();
            this.description = experience.getDescription();
        }
    }
}
