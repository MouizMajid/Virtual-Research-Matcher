package com.vrm.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.context.annotation.Bean;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private static final Logger log = LoggerFactory.getLogger(SecurityConfiguration.class);

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final List<String> allowedOrigins;

    public SecurityConfiguration(
        JwtAuthenticationFilter jwtAuthenticationFilter,
        @Value("${app.cors.allowed-origins}") List<String> allowedOrigins
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.allowedOrigins = allowedOrigins;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .exceptionHandling(exceptions -> exceptions
                // Without these, Spring Security answers every auth failure with an empty 403,
                // so the frontend can't tell "your session expired" from "you're not allowed".
                .authenticationEntryPoint(this::handleNotAuthenticated)
                .accessDeniedHandler(this::handleAccessDenied)
            )
            .authorizeHttpRequests(
                authorize -> authorize
                    // Internal error dispatches carry no JWT. They must not be treated as
                    // logged-out requests, or an ordinary error would turn into a 401
                    // and sign the user out.
                    .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
                    // Covers both /auth/cas/login and /auth/cas/callback - CAS needs to
                    // reach the callback before the browser has any JWT to authenticate with.
                    .requestMatchers("/auth/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/postings").hasRole("RESEARCHER")
                    .requestMatchers(HttpMethod.DELETE, "/postings/**").hasRole("RESEARCHER")
                    .requestMatchers(HttpMethod.PUT, "/postings/**").hasRole("RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/postings").permitAll()
                    .requestMatchers(HttpMethod.GET, "/postings/my").hasRole("RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/postings/researcherpostings/**").authenticated()
                    .requestMatchers(HttpMethod.GET, "/postings/**").permitAll()

                    .requestMatchers(HttpMethod.POST, "/applications").hasRole("STUDENT")
                    .requestMatchers(HttpMethod.PUT, "/applications/**").hasRole("STUDENT")
                    .requestMatchers(HttpMethod.PATCH, "/applications/**").hasAnyRole("STUDENT","RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/applications/**").hasAnyRole("STUDENT", "RESEARCHER")

                    .requestMatchers(HttpMethod.GET, "/users/me").hasAnyRole("STUDENT", "RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/users/*/profile").hasAnyRole("STUDENT", "RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/users/me/profile").hasAnyRole("STUDENT", "RESEARCHER")
                    .requestMatchers(HttpMethod.PUT, "/users/me/profile").hasAnyRole("STUDENT", "RESEARCHER")

                .anyRequest().authenticated()
            )
            .sessionManagement(
                session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    private void handleNotAuthenticated(
        HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException e
    ) throws IOException {
        boolean tokenRejected = request.getAttribute(JwtAuthenticationFilter.TOKEN_REJECTED_ATTRIBUTE) != null;
        log.info("401 on {} {} ({})", request.getMethod(), request.getRequestURI(), tokenRejected ? "expired or invalid token" : "no token");
        writeError(response, HttpServletResponse.SC_UNAUTHORIZED, tokenRejected
            ? "Your session has expired. Please sign in again."
            : "Please sign in to continue.");
    }

    private void handleAccessDenied(
        HttpServletRequest request,
        HttpServletResponse response,
        AccessDeniedException e
    ) throws IOException {
        log.warn("403 on {} {}", request.getMethod(), request.getRequestURI());
        writeError(response, HttpServletResponse.SC_FORBIDDEN, "You don't have permission to do this.");
    }

    // Same {"message": "..."} shape as GlobalExceptionHandler. These run in the security
    // filter chain, before Spring MVC, so @ExceptionHandler methods can't handle them.
    private void writeError(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.getWriter().write("{\"message\":\"" + message + "\"}");
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
