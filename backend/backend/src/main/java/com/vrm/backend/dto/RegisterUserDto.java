package com.vrm.backend.dto;

import com.vrm.backend.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private User.Role role;

}
