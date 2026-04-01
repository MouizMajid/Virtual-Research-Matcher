package com.vrm.backend.dto;

import com.vrm.backend.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {
    // this is the data transfer object used to create a user
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private User.Role role;

}
