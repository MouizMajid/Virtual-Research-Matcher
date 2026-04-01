package com.vrm.backend.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter 
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
// User class implements UserDetails for Spring Security integration
public class User implements UserDetails {
    // there are 2 possible roles for users: STUDENT and RESEARCHER
    public enum Role {
        STUDENT,
        RESEARCHER
    }
    // id means the unique identifier for each user, generated automatically by the database
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; 

    // each user has an email
    @Column(unique = true, nullable = false)
    private String email;

    // password as well
    @Column(nullable = false)
    private String password;
    

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private boolean enabled;

    @Column(name= "verification_code", length = 64)
    private String verificationCode;

    @Column(name = "verification_expired", length = 64)
    private LocalDateTime verificationExpired;

    public User( String email, String password) {
        this.email = email;
        this.password = password;
    }

    // this is required by UserDetails and spring security, in this case, our username is the users email
    @Override
    public String getUsername() {
        return email; 
    }

    // this is also required by UserDetails, we return the users role as a GrantedAuthority for spring security to use in authorization
    @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    // enabled means the user verified their email with the code 
    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
