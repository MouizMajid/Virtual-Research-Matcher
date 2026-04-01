package com.vrm.backend.service;

import org.springframework.stereotype.Service;

import com.vrm.backend.dto.UpdateUserInfoDto;
import com.vrm.backend.model.Education;
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

        if (dto.getEducation() != null) {
            userInfo.getEducation().clear();
            for (UpdateUserInfoDto.EducationDto eduDto : dto.getEducation()) {
                Education edu = new Education();
                edu.setUserInfo(userInfo);
                edu.setDegree(eduDto.getDegree());
                edu.setInstitution(eduDto.getInstitution());
                edu.setYear(eduDto.getYear());
                userInfo.getEducation().add(edu);
            }
        }

        return userInfoRepository.save(userInfo);
    }
}
