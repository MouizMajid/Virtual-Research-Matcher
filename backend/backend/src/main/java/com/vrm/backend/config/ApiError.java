package com.vrm.backend.config;

// The JSON body of every error response: {"message": "..."}.
// The frontend reads this in lib/apiErrors.ts and shows the message to the user.
public record ApiError(String message) {
}
