package com.vrm.backend.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Service
public class JWTService {
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private Long expirationTime;

    public String extractUsername(String token) {
        // Implement logic to extract username from JWT token
        return extractClaim(token, Claims::getSubject); // Placeholder
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        // Implement logic to extract a specific claim from JWT token
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    public String generateToken(UserDetails userDetails) {
        // Implement logic to generate JWT token for a given username
        return generateToken(new HashMap<>(), userDetails); // Placeholder
    }

    public String generateToken(
        HashMap<String, Object> extraClaims,
        UserDetails userDetails
    ) {
        // Implement logic to generate JWT token with extra claims for a given username
        return buildToken(extraClaims, userDetails, expirationTime); // Placeholder
    }

    public long getExpirationTime() {
        return expirationTime;
    }
    private String buildToken(
        HashMap<String, Object> extraClaims,
        UserDetails userDetails,
        long expirationTime
    ) {
        // Implement logic to build JWT token with extra claims for a given username
        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
            .signWith(getSignInKey(), SignatureAlgorithm.ES256).compact();
    }
   
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    private boolean isTokenExpired(String token) { 
        return extractExpiration(token).before(new Date(System.currentTimeMillis()));
    }
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
