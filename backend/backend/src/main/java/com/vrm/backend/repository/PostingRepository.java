package com.vrm.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vrm.backend.model.Posting;

@Repository
public interface PostingRepository extends JpaRepository<Posting, Long> {
    List<Posting> findByCreatedById(Long userId);
    
}
