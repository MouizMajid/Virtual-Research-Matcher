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
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; 

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    //@Column(nullable = false)
    @Column
    private String firstName;

    //@Column(nullable = false)
    @Column
    private String lastName;

    // @Column(nullable = false)
    @Column
    private String role;

    // @Column(nullable = false)
    @Column
    private boolean enabled;

    @Column(name= "verification_code", length = 64)
    private String verificationCode;

    @Column(name = "verification_expired", length = 64)
    private LocalDateTime verificationExpired;

    public User( String email, String password) {
        this.email = email;
        this.password = password;
    }
    @Override
    public String getUsername() {
        return email; 
    }

    @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return List.of(new SimpleGrantedAuthority("ROLE_" + role));
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
    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
