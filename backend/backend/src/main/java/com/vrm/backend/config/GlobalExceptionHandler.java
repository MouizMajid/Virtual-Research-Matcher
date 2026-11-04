package com.vrm.backend.config;

import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.vrm.backend.exception.ApiException;
import com.vrm.backend.model.User;

import jakarta.servlet.http.HttpServletRequest;

// Turns exceptions into {"message": "..."} responses, and is the one place they get logged.
// When an @ExceptionHandler handles an exception, Spring considers it dealt with and doesn't
// log it, so a failure is invisible in journalctl unless we log it here.
//
//   - Expected problems (bad input, not found, not allowed) log one WARN line.
//   - Anything else is a bug: it logs at ERROR with a stack trace, and the browser only
//     gets a generic message so internals are never exposed.
//
// Logs identify the user by id and never include request bodies, to keep personal
// information out of the journal.
@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private static final String UNEXPECTED_MESSAGE =
        "Something went wrong on our end. Please try again, and contact support if it keeps happening.";

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiError> handleApiException(ApiException e, HttpServletRequest request) {
        logExpected(e.getStatus().value(), request, e.getMessage());
        return respond(e.getStatus(), e.getMessage());
    }

    // A @Valid check failed, e.g. a title over the length limit.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException e, HttpServletRequest request) {
        String message = e.getBindingResult().getFieldErrors().stream()
            .map(error -> error.getDefaultMessage())
            .distinct()
            .collect(Collectors.joining(". "));
        logExpected(400, request, message);
        return respond(HttpStatus.BAD_REQUEST, message);
    }

    // The JSON couldn't be mapped onto the DTO, e.g. text sent for a number field.
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleUnreadableRequest(HttpMessageNotReadableException e, HttpServletRequest request) {
        logExpected(400, request, e.getMessage());
        return respond(HttpStatus.BAD_REQUEST, "One of the values you entered is missing or in the wrong format. Please check the form and try again.");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgument(IllegalArgumentException e, HttpServletRequest request) {
        logExpected(400, request, e.getMessage());
        return respond(HttpStatus.BAD_REQUEST, "One of the values you entered isn't valid. Please check the form and try again.");
    }

    // The database refused the data. Validation should catch this first, so seeing it in
    // the logs means a DTO limit is out of step with the schema - hence ERROR, not WARN.
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleDataIntegrity(DataIntegrityViolationException e, HttpServletRequest request) {
        log.error("Database rejected {} {} (user={})", request.getMethod(), request.getRequestURI(), currentUserId(), e);
        return respond(HttpStatus.BAD_REQUEST, "We couldn't save this because a value is too long or missing. Please check the form and try again.");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleUnexpectedException(Exception e, HttpServletRequest request) {
        // Spring's own errors (unknown URL, wrong HTTP method, missing parameter) already
        // carry the right status code, so they aren't bugs in this app.
        if (e instanceof ErrorResponse errorResponse) {
            HttpStatus status = HttpStatus.valueOf(errorResponse.getStatusCode().value());
            logExpected(status.value(), request, e.getMessage());
            return respond(status, status.getReasonPhrase());
        }
        log.error("Unexpected error on {} {} (user={})", request.getMethod(), request.getRequestURI(), currentUserId(), e);
        return respond(HttpStatus.INTERNAL_SERVER_ERROR, UNEXPECTED_MESSAGE);
    }

    private ResponseEntity<ApiError> respond(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(new ApiError(message));
    }

    private void logExpected(int status, HttpServletRequest request, String detail) {
        log.warn("{} on {} {} (user={}): {}", status, request.getMethod(), request.getRequestURI(), currentUserId(), detail);
    }

    private String currentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User user) {
            return String.valueOf(user.getId());
        }
        return "anonymous";
    }
}
