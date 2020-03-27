package com.fitbook.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "Training_Difficulty")
public class TrainingDifficulty {
    @Id
    @GeneratedValue(generator = "training_difficulty_generator")
    @SequenceGenerator(
            name = "training_difficulty_generator",
            sequenceName = "training_difficulty_sequence",
            initialValue = 1000
    )
    private Long id;

    @Column(columnDefinition = "text", unique = true)
    private String code;

    @Column(columnDefinition = "text", unique = false)
    private String displayName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
