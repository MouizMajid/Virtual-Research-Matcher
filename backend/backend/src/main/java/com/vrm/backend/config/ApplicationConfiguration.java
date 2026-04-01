package com.vrm.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.vrm.backend.repository.UserRepository;

@Configuration
public class ApplicationConfiguration {
    // this class is responsible for configuring the authentication and security of the 
    // application, it defines beans for UserDetailsService, PasswordEncoder, AuthenticationManager, 
    // and AuthenticationProvider
    private final UserRepository userRepository;

    public ApplicationConfiguration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // this bean loads user-specific data during authentication, it is used by the 
    // authentication provider to get the user details (such as username, password, roles)
    //  from the database and use them to authenticate the user
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    // this bean is used to encode passwords before saving them to the database and to 
    // check passwords during authentication, we use BCrypt which is a strong hashing 
    // algorithm that adds salt to the password and is resistant to brute-force attacks
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // this bean is used to manage authentication, it is configured to use the 
    // DaoAuthenticationProvider which uses the UserDetailsService and PasswordEncoder to authenticate users
    // an example for how to use it in a service is shown in the AuthenticationService class where we call authenticationManager.authenticate() to authenticate a user with their email and password
    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    // this bean is the authentication provider that Spring Security uses to perform
    // authentication, it is configured to use the UserDetailsService and PasswordEncoder
    // defined above, it checks the user's credentials and loads their details during authentication
    // it is called by AuthenticationManager when we call authenticationManager.authenticate() 
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider =
            new DaoAuthenticationProvider(userDetailsService());

        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

}
