package com.vrm.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vrm.backend.dto.ApplicationDto;
import com.vrm.backend.model.Application;
import com.vrm.backend.model.Posting;
import com.vrm.backend.model.User;
import com.vrm.backend.repository.ApplicationRepository;
import com.vrm.backend.repository.PostingRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final PostingRepository postingRepository;

    public ApplicationService(
        ApplicationRepository applicationRepository,
        PostingRepository postingRepository
    ) {
        this.applicationRepository = applicationRepository;
        this.postingRepository = postingRepository;
    }

    public Application createApplication(ApplicationDto dto, User applicant) {
        Posting posting = postingRepository.findById(dto.getPostingId())
            .orElseThrow(() -> new RuntimeException("Posting not found"));

        Application application = new Application();
        application.setCoverLetter(dto.getCoverLetter());
        application.setResumeLink(dto.getResume());
        application.setWhy(dto.getWhy());
        application.setExperience(dto.getExperience());
        application.setApplicant(applicant);
        application.setPosting(posting);          // now it's a real Posting object
        application.setStatus(Application.Status.PENDING); // always start as PENDING
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsForApplicant(User applicant) {
        return applicationRepository.findByApplicantId(applicant.getId());
    }

    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Application not found"));
    }

    public Application updateApplication(Long id, ApplicationDto dto, User applicant) {
        Application application = getApplicationById(id);
        if (!application.getApplicant().getId().equals(applicant.getId())) {
            throw new RuntimeException("You can only update your own applications");
        }
        if (application.getStatus() != Application.Status.PENDING) {
            throw new RuntimeException("Only pending applications can be updated");
        }

        application.setCoverLetter(dto.getCoverLetter());
        application.setResumeLink(dto.getResume());
        application.setWhy(dto.getWhy());
        application.setExperience(dto.getExperience());

        return applicationRepository.save(application);
    }

    public void deleteApplication(Long id, User applicant) {
        Application application = getApplicationById(id);
        if (!application.getApplicant().getId().equals(applicant.getId())) {
            throw new RuntimeException("You can only delete your own applications");
        }
        if (application.getStatus() != Application.Status.PENDING) {
            throw new RuntimeException("Only pending applications can be deleted");
        }
        applicationRepository.delete(application);
    }

    

    

}