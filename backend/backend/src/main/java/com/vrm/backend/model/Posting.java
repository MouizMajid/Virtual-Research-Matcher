package com.vrm.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "postings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Posting {
    public enum Type {
        PROJECT,
        POSITION
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private int openPositions;

    @Column 
    private float stipend;

    @Column(nullable = false)
    private String duration;

    @Column(nullable = false)
    private LocalDate applicationDeadline;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    @Column(nullable = false)
    private String[] tags;
   
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

}
