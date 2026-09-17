package com.vrm.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.apereo.cas.client.validation.Assertion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.vrm.backend.model.User;
import com.vrm.backend.repository.UserRepository;

// Turns a validated CAS Assertion (the attribute bundle CAS hands back after a ticket
// checks out) into a local User row, so the rest of the app never has to know CAS exists -
// it just gets a normal User the same way it always did with email/password login.
@Service
public class CasAuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(CasAuthenticationService.class);

    private final UserRepository userRepository;

    public CasAuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Thrown when a brand-new user's uwoRole doesn't map to STUDENT/RESEARCHER.
    // Caught in CasAuthenticationController and turned into a friendly redirect
    // rather than creating a User row with a guessed/wrong role.
    public static class UnrecognizedRoleException extends RuntimeException {
        public UnrecognizedRoleException(String rawRole) {
            super("Unrecognized uwoRole attribute: " + rawRole);
        }
    }

    // Finds the user by the CAS "mail" attribute, or provisions a new one on first login.
    // Name/department are refreshed from CAS on every login (CAS is the source of truth
    // for those); role is only set once, at creation time, and never overwritten on
    // later logins - that way an uncertain/changing uwoRole mapping can never silently
    // reassign someone who already has an account (e.g. flip a RESEARCHER to STUDENT).
    public User findOrCreateUser(Assertion assertion) {
        Map<String, Object> attributes = assertion.getPrincipal().getAttributes();

        // TEMPORARY debug logging - remove once attribute shapes (esp. uwoRole) are confirmed
        // with WTS. This logs PII (name/email) on every login, so it shouldn't stay in prod.
        log.info("CAS principal: {}", assertion.getPrincipal().getName());
        log.info("CAS attributes: {}", attributes);

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
            // Existing row - could be someone who already logged in via CAS before, OR
            // (during the migration window) someone who registered the old-fashioned way
            // with the same email. Either way we just adopt the row; role is left as-is.
            User user = existing.get();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setDepartmentNumber(departmentNumber);
            return userRepository.save(user);
        }

        // New user: password is unused from here on (nothing ever compares it - CAS is
        // the only login path now) but the DB column is NOT NULL, so we just fill it
        // with a random value that can never be guessed or reused.
        User user = new User(email, UUID.randomUUID().toString());
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setDepartmentNumber(departmentNumber);
        user.setRole(mapRole(rawRole));
        user.setEnabled(true);
        return userRepository.save(user);
    }

    // KNOWN ISSUE (2026-09-17): a real login returned uwoRole=[UGS, STF] - a LIST of
    // short institutional codes, not a plain word like "student"/"faculty". asString()
    // below collapses that list down to just its first element ("UGS"), which doesn't
    // contain any of the substrings checked here, so this currently throws
    // UnrecognizedRoleException for real users. Waiting on WTS to confirm the full code
    // legend (what UGS/STF/etc. actually mean, and which should win when someone - like
    // a student staff member - has more than one at once) before rewriting this properly.
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

    // CAS attribute values can come back as a single value or a List (e.g. uwoRole is
    // multi-valued). We only need one string out of it, so we take the first element -
    // this is a simplification that loses information for genuinely multi-valued
    // attributes like uwoRole (see the KNOWN ISSUE above).
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
