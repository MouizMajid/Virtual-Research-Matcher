package com.vrm.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vrm.backend.dto.ForgotPasswordDto;
import com.vrm.backend.dto.LoginUserDto;
import com.vrm.backend.dto.RegisterUserDto;
import com.vrm.backend.dto.ResetPasswordDto;
import com.vrm.backend.dto.VerifyUserDto;
import com.vrm.backend.model.User;
import com.vrm.backend.responses.LoginResponse;
import com.vrm.backend.responses.RegisterResponse;
import com.vrm.backend.service.AuthenticationService;
import com.vrm.backend.service.JWTService;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JWTService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JWTService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {
        try {
            User registeredUser = authenticationService.signup(registerUserDto);
            return ResponseEntity.ok(new RegisterResponse(registeredUser));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse response = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try{
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("User verified successfully");
        }catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDto dto) {
        try {
            authenticationService.forgotPassword(dto.getEmail());
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Account not verified")) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
            // All other errors (email not found, etc.) are swallowed
        }
        return ResponseEntity.ok("If an account with that email exists, a reset link has been sent.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDto dto) {
        try {
            authenticationService.resetPassword(dto.getToken(), dto.getNewPassword());
            return ResponseEntity.ok("Password reset successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code resent successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
