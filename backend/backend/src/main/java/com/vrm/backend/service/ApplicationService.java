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

    public List<Application> getApplicationsForPosting(Posting posting, User user) {
        if (!posting.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You can only view applications for your own postings");
        }
        return applicationRepository.findByPostingId(posting.getId());
    }
    
    public List<Posting> getPostingsAppliedTo(User applicant) {
        return applicationRepository.findByApplicantId(applicant.getId()).stream()
            .map(Application::getPosting)
            .distinct()
            .toList();
    }

    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Application not found"));
    }

    public Application getApplicationForApplicant(Long id, User applicant) {
        Application application = getApplicationById(id);
        if (!application.getApplicant().getId().equals(applicant.getId())) {
            throw new RuntimeException("You can only view your own applications");
        }
        return application;
    }

    public Application getApplicationForResearcher(Long id, User researcher) {
        Application application = getApplicationById(id);
        if (!application.getPosting().getCreatedBy().getId().equals(researcher.getId())) {
            throw new RuntimeException("You can only view applications for your own postings");
        }
        return application;
    }

    public Application withdrawApplication(Long id, User applicant) {
        Application application = getApplicationById(id);
        if (!application.getApplicant().getId().equals(applicant.getId())) {
            throw new RuntimeException("You can only withdraw your own applications");
        }
        if (application.getStatus() == Application.Status.WITHDRAWN) {
            throw new RuntimeException("Application is already withdrawn");
        }
        application.setStatus(Application.Status.WITHDRAWN);
        return applicationRepository.save(application);
    }

    public Application updateApplicationStatus(Long id, Application.Status status, User researcher) {
        Application application = getApplicationById(id);
        if (!application.getPosting().getCreatedBy().getId().equals(researcher.getId())) {
            throw new RuntimeException("You can only update status for applications on your own postings");
        }
        application.setStatus(status);
        return applicationRepository.save(application);
    }

}