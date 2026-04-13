package com.vrm.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vrm.backend.dto.ApplicationDto;
import com.vrm.backend.model.Application;
import com.vrm.backend.model.Posting;
import com.vrm.backend.model.User;
import com.vrm.backend.responses.ApplicationResponse;
import com.vrm.backend.service.ApplicationService;
import com.vrm.backend.service.PostingService;


@RequestMapping("/applications")
@RestController
// this is a controller for Applications. It is the entry point into the backend for applications. It will handle all 
// requests related to applications, such as creating an application, getting applications for a posting, etc. It calls the 
// ApplicationService to perform the actual logic, and returns the appropriate responses.

public class ApplicationController {
    private final ApplicationService applicationService;
    private final PostingService postingService;

    // spring bean injection of the ApplicationService and PostingService
    public ApplicationController(ApplicationService applicationService, PostingService postingService) {
        this.applicationService = applicationService;
        this.postingService = postingService;
    }

    
    @PostMapping
    public ResponseEntity<ApplicationResponse> createApplication(@RequestBody ApplicationDto applicationDto) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Application app = applicationService.createApplication(applicationDto, user);
        return ResponseEntity.ok(new ApplicationResponse(app));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<ApplicationResponse> apps = applicationService.getApplicationsForApplicant(user).stream()
            .map(ApplicationResponse::new)
            .toList();
        return ResponseEntity.ok(apps);
    }

    @GetMapping("/{id}/applications")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsForPosting(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Posting posting = postingService.getPostingById(id);
        List<ApplicationResponse> applications = applicationService
            .getApplicationsForPosting(posting, user)
            .stream()
            .map(ApplicationResponse::new)
            .toList();
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponse> getApplication(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Application app = applicationService.getApplicationForApplicant(id, user);
        return ResponseEntity.ok(new ApplicationResponse(app));
    }

    @GetMapping("/{id}/researcher-view")
    public ResponseEntity<ApplicationResponse> getApplicationForResearcher(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Application app = applicationService.getApplicationForResearcher(id, user);
        return ResponseEntity.ok(new ApplicationResponse(app));
    }

    @PatchMapping("/{id}/withdraw")
    public ResponseEntity<ApplicationResponse> withdrawApplication(@PathVariable Long id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Application app = applicationService.withdrawApplication(id, user);
        return ResponseEntity.ok(new ApplicationResponse(app));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(
        @PathVariable Long id,
        @RequestBody Map<String, String> body
    ) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Application.Status status = Application.Status.valueOf(body.get("status"));
        Application updated = applicationService.updateApplicationStatus(id, status, user);
        return ResponseEntity.ok(new ApplicationResponse(updated));
    }
}
