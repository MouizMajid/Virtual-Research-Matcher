package com.vrm.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.vrm.backend.model.User;
import com.vrm.backend.repository.UserRepository;

@Service
public class UserService {
    // we use the repository in the service to interact with the database,
    // the service handles business logic and delegates database operations to the repository
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;  
    }
    // these methods are not really used in the application but they are here for 
    // demonstration and testing purposes, and to be used in future features such as admin user management
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
         userRepository.findAll().forEach(users::add);
         return users;
    }
}

