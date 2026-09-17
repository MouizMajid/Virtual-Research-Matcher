package com.vrm.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.apereo.cas.client.validation.Assertion;
import org.springframework.stereotype.Service;

import com.vrm.backend.model.User;
import com.vrm.backend.repository.UserRepository;

@Service
public class CasAuthenticationService {
    private final UserRepository userRepository;

    public CasAuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static class UnrecognizedRoleException extends RuntimeException {
        public UnrecognizedRoleException(String rawRole) {
            super("Unrecognized uwoRole attribute: " + rawRole);
        }
    }

    // Finds the user by the CAS "mail" attribute, or provisions a new one on first login.
    // Name/department are refreshed from CAS on every login; role is only set at creation
    // time so an uncertain uwoRole mapping can never silently reassign an existing user.
    public User findOrCreateUser(Assertion assertion) {
        Map<String, Object> attributes = assertion.getPrincipal().getAttributes();

        String email = asString(attributes.get("mail"));
        String firstName = asString(attributes.get("givenName"));
        String lastName = asString(attributes.get("sn"));
        String departmentNumber = asString(attributes.get("departmentNumber"));
        String rawRole = asString(attributes.get("uwoRole"));

        if (email == null || email.isBlank()) {
            throw new IllegalStateException("CAS response did not include a mail attribute");
        }

        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            User user = existing.get();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setDepartmentNumber(departmentNumber);
            return userRepository.save(user);
        }

        User user = new User(email, UUID.randomUUID().toString());
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setDepartmentNumber(departmentNumber);
        user.setRole(mapRole(rawRole));
        user.setEnabled(true);
        return userRepository.save(user);
    }

    // Exact uwoRole string format is unconfirmed as of first implementation - unrecognized
    // values are rejected rather than guessed. Adjust once real login logs show the format.
    private User.Role mapRole(String rawRole) {
        if (rawRole == null) {
            throw new UnrecognizedRoleException("<missing>");
        }
        String normalized = rawRole.trim().toLowerCase();
        if (normalized.contains("faculty") || normalized.contains("staff") || normalized.contains("employee")) {
            return User.Role.RESEARCHER;
        }
        if (normalized.contains("student")) {
            return User.Role.STUDENT;
        }
        throw new UnrecognizedRoleException(rawRole);
    }

    private String asString(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof List<?> list) {
            return list.isEmpty() ? null : String.valueOf(list.get(0));
        }
        return String.valueOf(value);
    }
}
