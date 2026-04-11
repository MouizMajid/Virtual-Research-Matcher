package com.vrm.backend.service;

import org.springframework.stereotype.Service;

import com.vrm.backend.dto.UpdateUserInfoDto;
import com.vrm.backend.model.Experience;
import com.vrm.backend.model.User;
import com.vrm.backend.model.UserInfo;
import com.vrm.backend.repository.UserInfoRepository;

@Service
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;

    public UserInfoService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    public UserInfo getOrCreate(User user) {
        return userInfoRepository.findByUser(user).orElseGet(() -> {
            UserInfo newInfo = new UserInfo();
            newInfo.setUser(user);
            return userInfoRepository.save(newInfo);
        });
    }

    public UserInfo update(User user, UpdateUserInfoDto dto) {
        UserInfo userInfo = getOrCreate(user);

        userInfo.setHeadline(dto.getHeadline());
        userInfo.setBio(dto.getBio());
        userInfo.setLocation(dto.getLocation());
        userInfo.setUniversity(dto.getUniversity());
        userInfo.setDepartment(dto.getDepartment());
        userInfo.setGithubUrl(dto.getGithubUrl());
        userInfo.setLinkedinUrl(dto.getLinkedinUrl());
        userInfo.setWebsiteUrl(dto.getWebsiteUrl());

        if (dto.getSkills() != null) {
            userInfo.getSkills().clear();
            userInfo.getSkills().addAll(dto.getSkills());
        }

        if (dto.getExperiences() != null) {
            userInfo.getExperiences().clear();
            for (UpdateUserInfoDto.ExperienceDto expDto : dto.getExperiences()) {
                Experience exp = new Experience();
                exp.setUserInfo(userInfo);
                exp.setTitle(expDto.getTitle());
                exp.setCompany(expDto.getCompany());
                exp.setBeginDate(expDto.getBeginDate());
                exp.setEndDate(expDto.getEndDate());
                exp.setDescription(expDto.getDescription());
                userInfo.getExperiences().add(exp);
            }
        }

        return userInfoRepository.save(userInfo);
    }
}
