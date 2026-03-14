package com.vrm.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.vrm.backend.model.User;
import com.vrm.backend.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;   
        this.emailService = emailService;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
         userRepository.findAll().forEach(users::add);
         return users;
    }
}

