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

// Entry point for Western's CAS single sign-on. This replaces the old
// AuthenticationController (email/password) entirely - CAS is now the only way in.
//
// The whole exchange is plain browser redirects, no JSON API calls involved:
//   1. Browser hits GET /auth/cas/login       -> we redirect it to CAS's login page.
//   2. User authenticates at CAS (Duo MFA etc. happens entirely on CAS's side).
//   3. CAS redirects the browser back to our "service" URL with a one-time ?ticket=...
//      That service URL is THIS controller's /auth/cas/callback endpoint.
//   4. We take that ticket and, server-to-server, ask CAS to validate it
//      (Cas30ServiceTicketValidator calling {cas.server.url-prefix}/p3/serviceValidate).
//      CAS hands back an Assertion containing the released attributes (mail, givenName, etc).
//   5. We turn that into (or find) a local User row and mint our OWN JWT via JWTService -
//      exactly the same JWT the old password-based login used to produce - so nothing
//      downstream (JwtAuthenticationFilter, AuthContext.tsx, the Axios interceptor) had
//      to change. CAS is only ever a "front door"; auth after that point is still our JWT.
//   6. We redirect the browser one last time to the frontend's /sso-callback page,
//      carrying the JWT (or an error code) as a query param for it to pick up.
@RequestMapping("/auth/cas")
@RestController
public class CasAuthenticationController {
    private static final Logger log = LoggerFactory.getLogger(CasAuthenticationController.class);

    private final CasAuthenticationService casAuthenticationService;
    private final JWTService jwtService;
    private final Cas30ServiceTicketValidator ticketValidator;
    private final String casLoginUrl;
    // The "service" URL is what we tell CAS to redirect back to, AND what we must pass
    // again when validating the ticket - CAS checks both uses match. WTS registered
    // vrmm.eng.uwo.ca as a trusted domain, covering any path under it, so this can be
    // whatever path we like (unlike OIDC, which requires an exact pre-registered redirect
    // URI - see the class comment in application-prod.properties for why CAS differs here).
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
        // Cas30ServiceTicketValidator validates against CAS protocol 3, which is what
        // lets the response include attributes (mail, uwoRole, etc) - protocol 2's
        // response schema doesn't formally support that.
        this.ticketValidator = new Cas30ServiceTicketValidator(casServerUrlPrefix);
    }

    // Step 1: kick the browser off to CAS's login page. No ticket yet.
    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        String redirectUrl = casLoginUrl + "?service=" + URLEncoder.encode(serviceUrl, StandardCharsets.UTF_8);
        response.sendRedirect(redirectUrl);
    }

    // Step 3-6: CAS redirects here with ?ticket=... after a successful login.
    @GetMapping("/callback")
    public void callback(@RequestParam("ticket") String ticket, HttpServletResponse response) throws IOException {
        try {
            // Server-to-server call to CAS's serviceValidate endpoint - the ticket is
            // single-use and short-lived, so this must happen immediately.
            Assertion assertion = ticketValidator.validate(ticket, serviceUrl);
            User user = casAuthenticationService.findOrCreateUser(assertion);
            String jwt = jwtService.generateToken(user);
            response.sendRedirect(frontendUrl + "/sso-callback?token=" + URLEncoder.encode(jwt, StandardCharsets.UTF_8));
        } catch (TicketValidationException e) {
            // Ticket was invalid/expired/already used, or CAS rejected our service URL.
            log.warn("CAS ticket validation failed", e);
            response.sendRedirect(frontendUrl + "/sso-callback?error=validation-failed");
        } catch (CasAuthenticationService.UnrecognizedRoleException e) {
            // A brand-new user whose uwoRole doesn't map to STUDENT/RESEARCHER - see
            // CasAuthenticationService.mapRole() for why we reject rather than guess.
            log.warn(e.getMessage());
            response.sendRedirect(frontendUrl + "/sso-callback?error=unrecognized-role");
        } catch (Exception e) {
            log.error("Unexpected error during CAS callback", e);
            response.sendRedirect(frontendUrl + "/sso-callback?error=unknown");
        }
    }
}
