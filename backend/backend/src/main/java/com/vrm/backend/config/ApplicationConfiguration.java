package com.vrm.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.vrm.backend.repository.UserRepository;

@Configuration
public class ApplicationConfiguration {
    // this class configures the UserDetailsService used by JwtAuthenticationFilter to
    // load the authenticated user (by email) on every request carrying a valid JWT.
    // There is no password-based AuthenticationManager/AuthenticationProvider anymore:
    // identity is established entirely via CAS, and JwtAuthenticationFilter builds the
    // Authentication object directly from a validated JWT rather than via AuthenticationManager.
    private final UserRepository userRepository;

    public ApplicationConfiguration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
