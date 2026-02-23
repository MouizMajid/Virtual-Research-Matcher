package com.vrm.backend.responses;

import com.vrm.backend.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;

    public RegisterResponse(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.role = user.getRole().name();
    }
}
