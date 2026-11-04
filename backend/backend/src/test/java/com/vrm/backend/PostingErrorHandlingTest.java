package com.vrm.backend;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;

import com.vrm.backend.config.SecurityConfiguration;
import com.vrm.backend.controller.PostingController;
import com.vrm.backend.model.Posting;
import com.vrm.backend.model.User;
import com.vrm.backend.repository.ApplicationRepository;
import com.vrm.backend.repository.PostingRepository;
import com.vrm.backend.service.JWTService;
import com.vrm.backend.service.PostingService;
import com.vrm.backend.service.UserService;

// Sends real HTTP requests through the actual security chain, controller, JSON parsing,
// validation and service. Only the database layer is mocked.
@WebMvcTest(PostingController.class)
@Import({ SecurityConfiguration.class, PostingService.class, JWTService.class })
@TestPropertySource(properties = {
    "security.jwt.secret=" + PostingErrorHandlingTest.SECRET,
    "security.jwt.expiration=3600000"
})
@ExtendWith(OutputCaptureExtension.class)
class PostingErrorHandlingTest {
    static final String SECRET = "dGVzdC1vbmx5LXNlY3JldC10ZXN0LW9ubHktc2VjcmV0LXRlc3Qtb25seS1zZWNyZXQ=";

    @Autowired private MockMvc mockMvc;
    @Autowired private JWTService jwtService;

    @MockitoBean private PostingRepository postingRepository;
    @MockitoBean private ApplicationRepository applicationRepository;
    @MockitoBean private UserService userService;
    @MockitoBean private UserDetailsService userDetailsService;

    private User researcher;

    @BeforeEach
    void setUp() {
        researcher = user("prof@uwo.ca", User.Role.RESEARCHER);
        when(userDetailsService.loadUserByUsername(researcher.getEmail())).thenReturn(researcher);
        when(postingRepository.save(any(Posting.class))).thenAnswer(call -> call.getArgument(0));
    }

    // The professor's bug: blank Compensation reaches the backend as "stipend": null.
    @Test
    void blankCompensationIsAcceptedAndStoredAsZero() throws Exception {
        mockMvc.perform(post("/postings")
                .header("Authorization", bearer(researcher))
                .contentType(MediaType.APPLICATION_JSON)
                .content(postingJson("Valid title", "null")))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.stipend").value(0.0));

        ArgumentCaptor<Posting> saved = ArgumentCaptor.forClass(Posting.class);
        verify(postingRepository).save(saved.capture());
        assertThat(saved.getValue().getStipend()).isZero();
        assertThat(saved.getValue().getTags()).containsExactly("3D printing");
    }

    @Test
    void enteredCompensationIsKept() throws Exception {
        mockMvc.perform(post("/postings")
                .header("Authorization", bearer(researcher))
                .contentType(MediaType.APPLICATION_JSON)
                .content(postingJson("Valid title", "2000")))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.stipend").value(2000.0));
    }

    @Test
    void editingWithBlankCompensationAlsoWorks() throws Exception {
        Posting existing = new Posting();
        existing.setCreatedBy(researcher);
        when(postingRepository.findById(7L)).thenReturn(Optional.of(existing));

        researcher.setId(1L);
        mockMvc.perform(put("/postings/7")
                .header("Authorization", bearer(researcher))
                .contentType(MediaType.APPLICATION_JSON)
                .content(postingJson("Edited title", "null")))
            .andExpect(status().isOk());
    }

    @Test
    void tooLongTitleGetsARealMessageAndIsNeverSaved() throws Exception {
        mockMvc.perform(post("/postings")
                .header("Authorization", bearer(researcher))
                .contentType(MediaType.APPLICATION_JSON)
                .content(postingJson("x".repeat(256), "0")))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Title must be 255 characters or fewer"));

        verify(postingRepository, never()).save(any());
    }

    @Test
    void expiredTokenGets401WithSessionMessage() throws Exception {
        mockMvc.perform(post("/postings")
                .header("Authorization", "Bearer " + expiredToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(postingJson("Valid title", "0")))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.message").value("Your session has expired. Please sign in again."));

        verify(postingRepository, never()).save(any());
    }

    // Previously an expired token returned 400 even on public pages.
    @Test
    void expiredTokenDoesNotBreakPublicEndpoints() throws Exception {
        when(postingRepository.findAll()).thenReturn(List.of());

        mockMvc.perform(get("/postings").header("Authorization", "Bearer " + expiredToken()))
            .andExpect(status().isOk());
    }

    @Test
    void garbageTokenIsTreatedAsNotLoggedIn() throws Exception {
        mockMvc.perform(get("/postings/my").header("Authorization", "Bearer not-a-real-token"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void noTokenGets401WithSignInMessage() throws Exception {
        mockMvc.perform(get("/postings/my"))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.message").value("Please sign in to continue."));
    }

    // Must stay a 403. If it became a 401, the frontend would sign the user out.
    @Test
    void wrongRoleGets403NotA401() throws Exception {
        User student = user("student@uwo.ca", User.Role.STUDENT);
        when(userDetailsService.loadUserByUsername(student.getEmail())).thenReturn(student);

        mockMvc.perform(post("/postings")
                .header("Authorization", bearer(student))
                .contentType(MediaType.APPLICATION_JSON)
                .content(postingJson("Valid title", "0")))
            .andExpect(status().isForbidden())
            .andExpect(jsonPath("$.message").value("You don't have permission to do this."));
    }

    @Test
    void missingPostingGets404WithItsMessage() throws Exception {
        when(postingRepository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/postings/99"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.message").value("Posting not found"));
    }

    @Test
    void unexpectedErrorIsLoggedButHiddenFromTheBrowser(CapturedOutput logs) throws Exception {
        when(postingRepository.save(any(Posting.class))).thenThrow(new IllegalStateException("internal-detail-xyz"));

        mockMvc.perform(post("/postings")
                .header("Authorization", bearer(researcher))
                .contentType(MediaType.APPLICATION_JSON)
                .content(postingJson("Valid title", "0")))
            .andExpect(status().isInternalServerError())
            .andExpect(jsonPath("$.message", containsString("Something went wrong")))
            .andExpect(jsonPath("$.message", not(containsString("internal-detail-xyz"))));

        assertThat(logs.getAll()).contains("Unexpected error on POST /postings").contains("internal-detail-xyz");
    }

    @Test
    void databaseRejectionIsLoggedButHiddenFromTheBrowser(CapturedOutput logs) throws Exception {
        when(postingRepository.save(any(Posting.class)))
            .thenThrow(new DataIntegrityViolationException("value too long for type character varying(255)"));

        mockMvc.perform(post("/postings")
                .header("Authorization", bearer(researcher))
                .contentType(MediaType.APPLICATION_JSON)
                .content(postingJson("Valid title", "0")))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message", not(containsString("character varying"))));

        assertThat(logs.getAll()).contains("Database rejected POST /postings").contains("character varying");
    }

    private User user(String email, User.Role role) {
        User user = new User(email, "unused");
        user.setRole(role);
        user.setEnabled(true);
        user.setFirstName("Test");
        user.setLastName("User");
        return user;
    }

    private String bearer(User user) {
        return "Bearer " + jwtService.generateToken(user);
    }

    private String expiredToken() {
        JWTService expiring = new JWTService();
        ReflectionTestUtils.setField(expiring, "secretKey", SECRET);
        ReflectionTestUtils.setField(expiring, "expirationTime", -60000L);
        return expiring.generateToken(researcher);
    }

    private String postingJson(String title, String stipend) {
        return """
            {
              "type": "PROJECT",
              "title": "%s",
              "description": "A description",
              "location": "On-site",
              "duration": "6 months",
              "openPositions": 2,
              "requirements": "",
              "stipend": %s,
              "applicationDeadline": "2026-12-01",
              "tags": ["3D printing"]
            }
            """.formatted(title, stipend);
    }
}
