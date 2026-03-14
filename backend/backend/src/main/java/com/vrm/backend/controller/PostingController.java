package com.vrm.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vrm.backend.dto.CreatePostingDto;
import com.vrm.backend.model.Posting;
import com.vrm.backend.model.User;
import com.vrm.backend.responses.PostingResponse;
import com.vrm.backend.service.PostingService;
import com.vrm.backend.service.UserService;

@RequestMapping("/postings")
@RestController
public class PostingController {
    private final PostingService postingService;
    private final UserService userService;

    public PostingController(PostingService postingService, UserService userService) {
        this.postingService = postingService;
        this.userService = userService;
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

    @GetMapping("/my")
    public ResponseEntity<List<PostingResponse>> getMyPostings() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<PostingResponse> postings = postingService.getPostingsByUser(user).stream()
            .map(PostingResponse::new)
            .toList();
        return ResponseEntity.ok(postings);
    }

    @GetMapping("/researcherpostings/{id}")
    public ResponseEntity<List<PostingResponse>> getPostingById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        List<PostingResponse> postings = postingService.getPostingsByUser(user).stream()
            .map(PostingResponse::new)
            .toList();
        return ResponseEntity.ok(postings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostingResponse> getPosting(@PathVariable Long id) {
        Posting posting = postingService.getPostingById(id);
        return ResponseEntity.ok(new PostingResponse(posting));
    }


    @PutMapping("/{id}")
    public ResponseEntity<PostingResponse> updatePosting(
        @PathVariable Long id,
        @RequestBody CreatePostingDto updateDto
    ) {
        User currentUser = (User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        Posting updated = postingService.updatePosting(id, updateDto, currentUser);
        return ResponseEntity.ok(new PostingResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePosting(@PathVariable Long id) {
        User currentUser = (User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        postingService.deletePosting(id, currentUser);
        return ResponseEntity.noContent().build();
    }

    
}
