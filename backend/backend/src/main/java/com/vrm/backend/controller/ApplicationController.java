package com.vrm.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vrm.backend.dto.ApplicationDto;
import com.vrm.backend.model.Application;
import com.vrm.backend.model.User;
import com.vrm.backend.responses.ApplicationResponse;
import com.vrm.backend.service.ApplicationService;

@RequestMapping("/applications")
@RestController
public class ApplicationController {
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> createApplication(@RequestBody ApplicationDto applicationDto) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Application app =  applicationService.createApplication(applicationDto, user);
        return ResponseEntity.ok(new ApplicationResponse(app));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<ApplicationResponse> apps = applicationService.getApplicationsForApplicant(user).stream()
            .map(ApplicationResponse::new)
            .toList();;
        return ResponseEntity.ok(apps);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponse> getApplication(@PathVariable Long id) {
        Application app = applicationService.getApplicationById(id);
        return ResponseEntity.ok(new ApplicationResponse(app));
    }
}
