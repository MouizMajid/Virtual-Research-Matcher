package com.vrm.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.apereo.cas.client.validation.Assertion;
import org.springframework.stereotype.Service;

import com.vrm.backend.model.User;
import com.vrm.backend.repository.UserRepository;

// Turns a validated CAS Assertion (the attribute bundle CAS hands back after a ticket
// checks out) into a local User row, so the rest of the app never has to know CAS exists -
// it just gets a normal User the same way it always did with email/password login.
@Service
public class CasAuthenticationService {
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
    // later logins - that way a re-login (e.g. a graduating student later picking up a
    // staff code) can never silently reassign someone who already has an account.
    public User findOrCreateUser(Assertion assertion) {
        Map<String, Object> attributes = assertion.getPrincipal().getAttributes();

        String email = asString(attributes.get("mail"));
        String firstName = asString(attributes.get("givenName"));
        String lastName = asString(attributes.get("sn"));
        String departmentNumber = asString(attributes.get("departmentNumber"));
        List<String> roleCodes = asStringList(attributes.get("uwoRole"));

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
        user.setRole(mapRole(roleCodes));
        user.setEnabled(true);
        return userRepository.save(user);
    }

    // uwoRole -> STUDENT/RESEARCHER, per WTS's confirmed code legend (2026-09-30) and
    // Mouiz's product decisions on priority when someone holds more than one code at once
    // (Western has no notion of a "primary" affiliation - that call is entirely ours):
    //   FAC              -> RESEARCHER (faculty are unambiguously the PI/poster role)
    //   UGS or GRS       -> STUDENT     (even if STF is also present - WTS confirmed
    //                                    UGS+STF together just means a TA/student worker,
    //                                    still fundamentally a student for our purposes)
    //   STF alone        -> RESEARCHER (postdocs are tagged STF and often run projects;
    //                                    revisit once real staff-only logins can be
    //                                    observed in the logs)
    //   SAP/FOS/GEN/AFF  -> rejected (prospective students, alumni, and generic/affiliate
    //                                    accounts don't cleanly fit either role)
    private User.Role mapRole(List<String> roleCodes) {
        if (roleCodes.isEmpty()) {
            throw new UnrecognizedRoleException("<missing>");
        }
        if (roleCodes.contains("FAC")) {
            return User.Role.RESEARCHER;
        }
        if (roleCodes.contains("UGS") || roleCodes.contains("GRS")) {
            return User.Role.STUDENT;
        }
        if (roleCodes.contains("STF")) {
            return User.Role.RESEARCHER;
        }
        throw new UnrecognizedRoleException(roleCodes.toString());
    }

    // Most CAS attributes are single-valued; uwoRole specifically comes back as a List
    // of short codes (e.g. [UGS, STF]). Handles both shapes so callers don't have to care.
    private List<String> asStringList(Object value) {
        if (value == null) {
            return List.of();
        }
        if (value instanceof List<?> list) {
            return list.stream().map(String::valueOf).toList();
        }
        return List.of(String.valueOf(value));
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
