package com.vrm.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vrm.backend.dto.CreatePostingDto;
import com.vrm.backend.exception.ApiException;
import com.vrm.backend.model.Posting;
import com.vrm.backend.model.User;
import com.vrm.backend.repository.ApplicationRepository;
import com.vrm.backend.repository.PostingRepository;

@Service
public class PostingService {

    private final PostingRepository postingRepository;
    private final ApplicationRepository applicationRepository;

    public PostingService(PostingRepository postingRepository, ApplicationRepository applicationRepository) {
        this.postingRepository = postingRepository;
        this.applicationRepository = applicationRepository;
    }

    public Posting createPosting(CreatePostingDto input, User user) {
        if(user.getRole() != User.Role.RESEARCHER) {
            throw ApiException.forbidden("Only researchers can create postings");
        }

        Posting posting = new Posting();
        posting.setCreatedBy(user);
        applyInput(posting, input);

        return postingRepository.save(posting);
    }

    public List<Posting> getAllPostings() {
        return postingRepository.findAll();
    }

    public List<Posting> getPostingsByUser(User user) {
        return postingRepository.findByCreatedById(user.getId());
    }

    public Posting getPostingById(Long id) {
        return postingRepository.findById(id)
            .orElseThrow(() -> ApiException.notFound("Posting not found"));
    }

    public Posting updatePosting(Long id, CreatePostingDto input, User user) {
        Posting posting = getPostingById(id);
        if (!posting.getCreatedBy().getId().equals(user.getId())) {
            throw ApiException.forbidden("You can only edit your own postings");
        }

        applyInput(posting, input);

        return postingRepository.save(posting);
    }

    @Transactional
    public void deletePosting(Long id, User user) {
        Posting posting = getPostingById(id);
        if (!posting.getCreatedBy().getId().equals(user.getId())) {
            throw ApiException.forbidden("You can only delete your own postings");
        }
        applicationRepository.deleteByPostingId(id);
        postingRepository.deleteById(id);
    }

    // Optional fields that arrive empty get a default, because their columns are NOT NULL
    // (duration, tags) or a primitive on the entity (stipend).
    private void applyInput(Posting posting, CreatePostingDto input) {
        posting.setType(input.getType());
        posting.setTitle(input.getTitle());
        posting.setDescription(input.getDescription());
        posting.setApplicationDeadline(input.getApplicationDeadline());
        posting.setLocation(input.getLocation());
        posting.setTags(input.getTags() != null ? input.getTags().toArray(String[]::new) : new String[0]);
        posting.setDuration(input.getDuration() != null ? input.getDuration() : "");
        posting.setRequirements(input.getRequirements());
        posting.setOpenPositions(input.getOpenPositions());
        posting.setStipend(input.getStipend() != null ? input.getStipend() : 0f);
    }
}
