package com.vrm.backend.dto;

import java.time.LocalDate;
import java.util.List;

import com.vrm.backend.model.Posting;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

// Length limits: title/location/duration match their varchar(255) columns. Description and
// requirements are TEXT columns with no real limit, so theirs is just a generous sanity cap.
// Keep these in sync with frontend/vrmfrontend/src/lib/postingLimits.ts.
@Getter
@Setter
public class CreatePostingDto {
    @NotNull(message = "Posting type is required")
    private Posting.Type type;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must be 255 characters or fewer")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 20000, message = "Description must be 20,000 characters or fewer")
    private String description;

    @NotBlank(message = "Location is required")
    @Size(max = 255, message = "Location must be 255 characters or fewer")
    private String location;

    @Size(max = 255, message = "Duration must be 255 characters or fewer")
    private String duration;

    @Min(value = 1, message = "Must have at least 1 open position")
    private int openPositions;

    @Size(max = 20000, message = "Requirements must be 20,000 characters or fewer")
    private String requirements;

    @NotNull(message = "Application deadline is required")
    private LocalDate applicationDeadline;

    // Boxed Float, not float: the field is optional, and a blank Compensation box arrives
    // as JSON null. Jackson 3 refuses to put null into a primitive, which rejected the
    // whole request. PostingService stores a blank as 0, which the UI doesn't display.
    private Float stipend;

    @Size(max = 30, message = "A posting can have at most 30 tags")
    private List<@Size(max = 100, message = "Each tag must be 100 characters or fewer") String> tags;
}
