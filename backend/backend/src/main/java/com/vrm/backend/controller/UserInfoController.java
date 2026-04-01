package com.vrm.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vrm.backend.dto.UpdateUserInfoDto;
import com.vrm.backend.model.User;
import com.vrm.backend.model.UserInfo;
import com.vrm.backend.responses.UserInfoResponse;
import com.vrm.backend.service.UserInfoService;

@RestController
@RequestMapping("/users/me/profile")
public class UserInfoController {

    private final UserInfoService userInfoService;

    public UserInfoController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    @GetMapping
    public ResponseEntity<UserInfoResponse> getProfile() {
        User currentUser = getCurrentUser();
        UserInfo userInfo = userInfoService.getOrCreate(currentUser);
        return ResponseEntity.ok(new UserInfoResponse(userInfo));
    }

    @PutMapping
    public ResponseEntity<UserInfoResponse> updateProfile(@RequestBody UpdateUserInfoDto dto) {
        User currentUser = getCurrentUser();
        UserInfo updated = userInfoService.update(currentUser, dto);
        return ResponseEntity.ok(new UserInfoResponse(updated));
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
