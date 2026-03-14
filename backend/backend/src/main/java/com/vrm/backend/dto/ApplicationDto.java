package com.vrm.backend.dto;


import lombok.Getter;
import lombok.Setter;
import com.vrm.backend.model.Application;


@Getter
@Setter

public class ApplicationDto {
    private Long postingId;
    private String coverLetter;
    private String resume;
    private String why;
    private String experience; 


}
