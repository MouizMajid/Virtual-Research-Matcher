package com.vrm.backend.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vrm.backend.dto.LoginUserDto;
import com.vrm.backend.dto.RegisterUserDto;
import com.vrm.backend.dto.VerifyUserDto;
import com.vrm.backend.model.User;
import com.vrm.backend.repository.UserRepository;

import jakarta.mail.MessagingException;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final EmailService emailService;
    
    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    public User signup(RegisterUserDto input){
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if(optionalUser.isPresent()){
            throw new RuntimeException("Email already registered");
        }
        User user = new User(input.getEmail(), passwordEncoder.encode(input.getPassword()));
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setRole(input.getRole());
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationExpired(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        User savedUser = userRepository.save(user);
        sendVerificationEmail(savedUser);
        return savedUser;
    }

    public User authenticate (LoginUserDto input){
        User user = userRepository.findByEmail(input.getEmail())
            .orElseThrow( () -> new RuntimeException("User with this email not found"));
        if (!user.isEnabled()) {
            throw new RuntimeException("User not verified");
        }
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.getEmail(), input.getPassword()
            )
        );
        return user;
    }

    public void verifyUser(VerifyUserDto input) { 
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationExpired().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired");
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationExpired(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid verification code");
            }
        } else {
            throw new RuntimeException("Cannot verify, user not found");
        }   
    }
    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new RuntimeException("User already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationExpired(LocalDateTime.now().plusMinutes(15));
            sendVerificationEmail(user);

            userRepository.save(user);
        } else {
            throw new RuntimeException("Can not resend verification code, user not found");
        }
    }
    public void sendVerificationEmail(User user) {
        String subject = "Verify your VRMM account";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<!DOCTYPE html><html><head><meta charset='UTF-8'></head>"
            + "<body style='margin:0;padding:0;background-color:#f3f4f8;font-family:Arial,sans-serif;'>"
            + "<table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:#f3f4f8;padding:40px 0;'>"
            + "<tr><td align='center'>"
            + "<table width='560' cellpadding='0' cellspacing='0' border='0' style='max-width:560px;width:100%;'>"

            // Header
            + "<tr><td style='background:#6366f1;background:linear-gradient(135deg,#6366f1,#a855f7);"
            + "border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;'>"
            + "<p style='margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;'>&#9879; VRMM</p>"
            + "<p style='margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;'>Virtual Research Match Maker</p>"
            + "</td></tr>"

            // Body
            + "<tr><td style='background:#ffffff;padding:40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>"
            + "<h1 style='margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1f36;'>Verify your email address</h1>"
            + "<p style='margin:0 0 32px;font-size:15px;color:#6b7280;line-height:1.6;'>"
            + "Thanks for signing up! Enter the code below in the app to activate your account.</p>"

            // Code box
            + "<div style='background:#f3f4f8;border:1px solid #e5e7eb;border-radius:12px;padding:24px;text-align:center;margin-bottom:32px;'>"
            + "<p style='margin:0 0 10px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.1em;'>Verification Code</p>"
            + "<p style='margin:0;font-size:42px;font-weight:800;letter-spacing:0.35em;color:#6366f1;'>" + verificationCode + "</p>"
            + "</div>"

            + "<p style='margin:0;font-size:13px;color:#9ca3af;line-height:1.6;'>"
            + "This code expires in <strong style='color:#1a1f36;'>15 minutes</strong>. "
            + "If you didn't create an account, you can safely ignore this email.</p>"
            + "</td></tr>"

            // Footer
            + "<tr><td style='background:#f9fafb;border:1px solid #e5e7eb;border-radius:0 0 16px 16px;"
            + "padding:20px 40px;text-align:center;'>"
            + "<p style='margin:0;font-size:12px;color:#9ca3af;'>&#169; 2025 VRMM &middot; Virtual Research Match Maker</p>"
            + "</td></tr>"

            + "</table></td></tr></table>"
            + "</body></html>";
        try{
            emailService.sendVerificationEmail(user.getUsername(), subject, htmlMessage);
        }
        catch(MessagingException e){
            throw new RuntimeException("Failed to send verification email");
        }
    }
    public void changePassword(User user, String currentPassword, String newPassword) {
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void forgotPassword(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return;
        }
        User user = optionalUser.get();
        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified");
        }
        String token = UUID.randomUUID().toString();
        user.setVerificationCode(token);
        user.setVerificationExpired(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);
        sendPasswordResetEmail(user, token);
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByVerificationCode(token)
            .orElseThrow(() -> new RuntimeException("Invalid or expired reset link"));
        if (user.getVerificationExpired().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset link has expired");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setVerificationCode(null);
        user.setVerificationExpired(null);
        userRepository.save(user);
    }

    public void sendPasswordResetEmail(User user, String token) {
        String subject = "Reset your VRMM password";
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        String htmlMessage = "<!DOCTYPE html><html><head><meta charset='UTF-8'></head>"
            + "<body style='margin:0;padding:0;background-color:#f3f4f8;font-family:Arial,sans-serif;'>"
            + "<table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:#f3f4f8;padding:40px 0;'>"
            + "<tr><td align='center'>"
            + "<table width='560' cellpadding='0' cellspacing='0' border='0' style='max-width:560px;width:100%;'>"
            + "<tr><td style='background:#6366f1;background:linear-gradient(135deg,#6366f1,#a855f7);"
            + "border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;'>"
            + "<p style='margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;'>&#9879; VRMM</p>"
            + "<p style='margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;'>Virtual Research Match Maker</p>"
            + "</td></tr>"
            + "<tr><td style='background:#ffffff;padding:40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>"
            + "<h1 style='margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1f36;'>Reset your password</h1>"
            + "<p style='margin:0 0 32px;font-size:15px;color:#6b7280;line-height:1.6;'>"
            + "We received a request to reset your password. Click the button below to choose a new one.</p>"
            + "<div style='text-align:center;margin-bottom:32px;'>"
            + "<a href='" + resetLink + "' style='display:inline-block;background:linear-gradient(135deg,#6366f1,#a855f7);"
            + "color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;"
            + "padding:14px 32px;border-radius:12px;'>Reset Password</a>"
            + "</div>"
            + "<p style='margin:0;font-size:13px;color:#9ca3af;line-height:1.6;'>"
            + "This link expires in <strong style='color:#1a1f36;'>15 minutes</strong>. "
            + "If you didn't request a password reset, you can safely ignore this email.</p>"
            + "</td></tr>"
            + "<tr><td style='background:#f9fafb;border:1px solid #e5e7eb;border-radius:0 0 16px 16px;"
            + "padding:20px 40px;text-align:center;'>"
            + "<p style='margin:0;font-size:12px;color:#9ca3af;'>&#169; 2025 VRMM &middot; Virtual Research Match Maker</p>"
            + "</td></tr>"
            + "</table></td></tr></table>"
            + "</body></html>";
        try {
            emailService.sendVerificationEmail(user.getUsername(), subject, htmlMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send reset email");
        }
    }

    public String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000; // Generate a random 6-digit code
        return String.valueOf(code);
    }
}
