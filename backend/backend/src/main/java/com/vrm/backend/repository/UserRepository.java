package com.vrm.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.vrm.backend.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    
}
