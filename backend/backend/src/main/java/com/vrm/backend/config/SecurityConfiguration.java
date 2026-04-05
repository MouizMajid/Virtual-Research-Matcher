package com.vrm.backend.config;

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
    // this class is responsible for configuring Spring Security for the application, 
    // it defines the security filter chain and CORS configuration
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(
        AuthenticationProvider authenticationProvider,
        JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    // this method configures the security filter chain, it defines which endpoints
    //  are protected and what roles are required to access them, it also configures
    //  CORS and disables CSRF since we are using JWT for authentication, it sets the 
    // session management to stateless since we are not using sessions, and it adds 
    // the JWT authentication filter to the filter chain 
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
                    .requestMatchers(HttpMethod.GET, "/{id}/applications").hasRole("RESEARCHER")
                    .requestMatchers(HttpMethod.PUT, "/applications/**").hasRole("STUDENT")
                    .requestMatchers(HttpMethod.PATCH, "/applications/**").hasRole("RESEARCHER")
                    .requestMatchers(HttpMethod.GET, "/applications/**").hasAnyRole("STUDENT", "RESEARCHER")
 
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
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:8080"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
