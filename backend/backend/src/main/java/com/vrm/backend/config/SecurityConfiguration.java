package com.vrm.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import java.util.List;

import org.springframework.context.annotation.Bean;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final List<String> allowedOrigins;

    public SecurityConfiguration(
        AuthenticationProvider authenticationProvider,
        JwtAuthenticationFilter jwtAuthenticationFilter,
        @Value("${app.cors.allowed-origins}") List<String> allowedOrigins
    ) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.allowedOrigins = allowedOrigins;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(
                authorize -> authorize
                    .requestMatchers("/auth/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/postings").hasRole("RESEARCHER")
                    .requestMatchers(HttpMethod.DELETE, "/postings/**").hasRole("RESEARCHER")
                    .requestMatchers(HttpMethod.PUT, "/postings/**").hasRole("RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/postings").permitAll()
                    .requestMatchers(HttpMethod.GET, "/postings/**").permitAll()

                    .requestMatchers(HttpMethod.POST, "/applications").hasRole("STUDENT")
                    .requestMatchers(HttpMethod.PUT, "/applications/**").hasRole("STUDENT")
                    .requestMatchers(HttpMethod.PATCH, "/applications/**").hasAnyRole("STUDENT","RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/applications/**").hasAnyRole("STUDENT", "RESEARCHER")

                    .requestMatchers(HttpMethod.GET, "/users/me").hasAnyRole("STUDENT", "RESEARCHER")
                    .requestMatchers(HttpMethod.PATCH, "/users/change-password").hasAnyRole("STUDENT", "RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/users/*/profile").hasAnyRole("STUDENT", "RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/users/me/profile").hasAnyRole("STUDENT", "RESEARCHER")
                    .requestMatchers(HttpMethod.PUT, "/users/me/profile").hasAnyRole("STUDENT", "RESEARCHER")

                .anyRequest().authenticated()
            )
            .sessionManagement(
                session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
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
