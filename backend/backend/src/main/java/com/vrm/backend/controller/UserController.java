package com.vrm.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vrm.backend.dto.ChangePasswordDto;
import com.vrm.backend.model.User;
import com.vrm.backend.service.AuthenticationService;
import com.vrm.backend.service.UserService;

@RequestMapping("/users")
@RestController
public class UserController {
    // the user controller provides endpoints related to user information, such as getting the authenticated user's info or listing all users (for admin purposes) 
    // it is not used in the application
    private final UserService userService;
    private final AuthenticationService authenticationService;

    public UserController(UserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }
    
    @GetMapping ("/me")
    public ResponseEntity<User> authenticatedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDto dto) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            authenticationService.changePassword(user, dto.getCurrentPassword(), dto.getNewPassword());
            return ResponseEntity.ok("Password updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> allUsers(){
        List <User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
