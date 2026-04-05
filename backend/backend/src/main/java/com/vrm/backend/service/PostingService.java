package com.vrm.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.vrm.backend.dto.CreatePostingDto;
import com.vrm.backend.model.Posting;
import com.vrm.backend.model.User;
import com.vrm.backend.repository.PostingRepository;

@Service
public class PostingService {
    
    private final PostingRepository postingRepository;

    public PostingService(PostingRepository postingRepository) {
        this.postingRepository = postingRepository;
    }

    public Posting createPosting(CreatePostingDto input, User user) {
        if(user.getRole() != User.Role.RESEARCHER) {
            throw new RuntimeException("Only researchers can create postings");
        }
        
        Posting posting = new Posting();

        posting.setType(input.getType());
        posting.setTitle(input.getTitle());
        posting.setDescription(input.getDescription());
        posting.setApplicationDeadline(input.getApplicationDeadline());
        posting.setLocation(input.getLocation());
        posting.setTags(input.getTags());
        posting.setCreatedBy(user);
        posting.setDuration(input.getDuration());
        posting.setRequirements(input.getRequirements());
        posting.setOpenPositions(input.getOpenPositions());
        posting.setStipend(input.getStipend());

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
            .orElseThrow(() -> new RuntimeException("Posting not found"));
    }

    public Posting updatePosting(Long id, CreatePostingDto input, User user) {
        Posting posting = getPostingById(id);
        if (!posting.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        posting.setType(input.getType());
        posting.setTitle(input.getTitle());
        posting.setDescription(input.getDescription());
        posting.setApplicationDeadline(input.getApplicationDeadline());
        posting.setLocation(input.getLocation());
        posting.setTags(input.getTags());
        posting.setCreatedBy(user);
        posting.setDuration(input.getDuration());
        posting.setRequirements(input.getRequirements());
        posting.setOpenPositions(input.getOpenPositions());
        posting.setStipend(input.getStipend());

        return postingRepository.save(posting);
    }

    public void deletePosting(Long id, User user) {
        Posting posting = getPostingById(id);
        if (!posting.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        postingRepository.deleteById(id);
    }

    
}
