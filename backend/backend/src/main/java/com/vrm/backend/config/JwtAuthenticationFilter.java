package com.vrm.backend.config;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.vrm.backend.service.JWTService;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    // this filter is responsible for intercepting incoming HTTP requests and 
    // checking for a valid JWT token in the Authorization header, if a valid token 
    // is found, it sets the authentication in the security context so that the 
    // user can access protected resources, if an error occurs during this 
    // process, it uses the HandlerExceptionResolver to handle the exception and 
    // return an appropriate response
    private final HandlerExceptionResolver handlerExceptionResolver;

    private final JWTService jwtService;

    private final UserDetailsService userDetailsService;

    // injection of the JWTService, UserDetailsService, and HandlerExceptionResolver
    public JwtAuthenticationFilter(
        JWTService jwtService,
        UserDetailsService userDetailsService,
        HandlerExceptionResolver handlerExceptionResolver
    ){
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        // JWT lives in authorization header, we check if the header is present and starts with "Bearer ",
        //  if not we just continue the filter chain without setting authentication
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // remove Bearer and get the token
            final String jwt = authHeader.substring(7);
            // then extract the username (email) from the token using the JWTService
            final String userEmail = jwtService.extractUsername(jwt);
            // security context holds the authentication information for the current request, 
            // we check if there is already an authentication set (which means the user is already 
            // authenticated) and if not we proceed to validate the token and set the authentication
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if(userEmail != null && authentication == null){
                // get user details object
                UserDetails userdetails = this.userDetailsService.loadUserByUsername(userEmail);
                // validate the token using the JWTService
                if(jwtService.isTokenValid(jwt, userdetails)){
                    // we create an authentication token and set it in the security context
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userdetails,
                        null,
                        userdetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    // save user in security context so that they can access protected resources
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            // continue the filter chain to allow the request to reach its destination (such as a controller)
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            handlerExceptionResolver.resolveException(request, response, null, e);
        }
    }

}