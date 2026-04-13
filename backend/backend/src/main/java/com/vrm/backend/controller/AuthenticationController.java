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
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(new RegisterResponse(registeredUser));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        return ResponseEntity.ok(new LoginResponse(jwtToken, jwtService.getExpirationTime()));
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        authenticationService.verifyUser(verifyUserDto);
        return ResponseEntity.ok("User verified successfully");
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
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDto dto) {
        authenticationService.resetPassword(dto.getToken(), dto.getNewPassword());
        return ResponseEntity.ok("Password reset successfully");
    }

    @PostMapping("/resend")
    public ResponseEntity<String> resendVerificationCode(@RequestParam String email) {
        authenticationService.resendVerificationCode(email);
        return ResponseEntity.ok("Verification code resent successfully");
    }

}
