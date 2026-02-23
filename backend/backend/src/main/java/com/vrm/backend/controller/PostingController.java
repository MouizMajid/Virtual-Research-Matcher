package com.vrm.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vrm.backend.dto.CreatePostingDto;
import com.vrm.backend.model.Posting;
import com.vrm.backend.model.User;
import com.vrm.backend.responses.PostingResponse;
import com.vrm.backend.service.PostingService;

@RequestMapping("/postings")
@RestController
public class PostingController {
    private final PostingService postingService;

    public PostingController(PostingService postingService) {
        this.postingService = postingService;
    }

    @PostMapping
    public ResponseEntity<PostingResponse> createPosting(
        @RequestBody CreatePostingDto createPostingDto) 
        {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Posting createdPosting = postingService.createPosting(createPostingDto, user);
        return ResponseEntity.ok(new PostingResponse(createdPosting));
    }

    @GetMapping
    public ResponseEntity<List<PostingResponse>> getAllPostings() {
        List<PostingResponse> postings = postingService.getAllPostings().stream()
            .map(PostingResponse::new)
            .toList();
        return ResponseEntity.ok(postings);
    }

    
}
