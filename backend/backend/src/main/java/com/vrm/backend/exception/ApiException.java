package com.vrm.backend.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

// An error we throw on purpose, with a message written for the end user. Anything else
// that goes wrong is treated as a bug: GlobalExceptionHandler logs it in full and sends
// the browser a generic message, so internal details (SQL, class names) never reach the UI.
@Getter
public class ApiException extends RuntimeException {
    private final HttpStatus status;

    private ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public static ApiException badRequest(String message) {
        return new ApiException(HttpStatus.BAD_REQUEST, message);
    }

    public static ApiException forbidden(String message) {
        return new ApiException(HttpStatus.FORBIDDEN, message);
    }

    public static ApiException notFound(String message) {
        return new ApiException(HttpStatus.NOT_FOUND, message);
    }
}
