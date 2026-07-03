package com.vrm.backend.service;

import org.springframework.stereotype.Service;

import com.vrm.backend.model.User;
import com.vrm.backend.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }
}

