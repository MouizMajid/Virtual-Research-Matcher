package com.vrm.backend.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.apereo.cas.client.validation.Assertion;
import org.apereo.cas.client.validation.Cas30ServiceTicketValidator;
import org.apereo.cas.client.validation.TicketValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vrm.backend.model.User;
import com.vrm.backend.service.CasAuthenticationService;
import com.vrm.backend.service.JWTService;

import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("/auth/cas")
@RestController
public class CasAuthenticationController {
    private static final Logger log = LoggerFactory.getLogger(CasAuthenticationController.class);

    private final CasAuthenticationService casAuthenticationService;
    private final JWTService jwtService;
    private final Cas30ServiceTicketValidator ticketValidator;
    private final String casLoginUrl;
    private final String serviceUrl;
    private final String frontendUrl;

    public CasAuthenticationController(
        CasAuthenticationService casAuthenticationService,
        JWTService jwtService,
        @Value("${cas.server.login-url}") String casLoginUrl,
        @Value("${cas.server.url-prefix}") String casServerUrlPrefix,
        @Value("${cas.service.url}") String serviceUrl,
        @Value("${app.frontend-url}") String frontendUrl
    ) {
        this.casAuthenticationService = casAuthenticationService;
        this.jwtService = jwtService;
        this.casLoginUrl = casLoginUrl;
        this.serviceUrl = serviceUrl;
        this.frontendUrl = frontendUrl;
        this.ticketValidator = new Cas30ServiceTicketValidator(casServerUrlPrefix);
    }

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        String redirectUrl = casLoginUrl + "?service=" + URLEncoder.encode(serviceUrl, StandardCharsets.UTF_8);
        response.sendRedirect(redirectUrl);
    }

    @GetMapping("/callback")
    public void callback(@RequestParam("ticket") String ticket, HttpServletResponse response) throws IOException {
        try {
            Assertion assertion = ticketValidator.validate(ticket, serviceUrl);
            User user = casAuthenticationService.findOrCreateUser(assertion);
            String jwt = jwtService.generateToken(user);
            response.sendRedirect(frontendUrl + "/sso-callback?token=" + URLEncoder.encode(jwt, StandardCharsets.UTF_8));
        } catch (TicketValidationException e) {
            log.warn("CAS ticket validation failed", e);
            response.sendRedirect(frontendUrl + "/sso-callback?error=validation-failed");
        } catch (CasAuthenticationService.UnrecognizedRoleException e) {
            log.warn(e.getMessage());
            response.sendRedirect(frontendUrl + "/sso-callback?error=unrecognized-role");
        } catch (Exception e) {
            log.error("Unexpected error during CAS callback", e);
            response.sendRedirect(frontendUrl + "/sso-callback?error=unknown");
        }
    }
}
