package com.fitbook.backend.model;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "Training_Types")
public class TrainingType {

    @Id
    @GeneratedValue(generator = "training_type_generator")
    @SequenceGenerator(
            name = "training_type_generator",
            sequenceName = "training_type_sequence",
            initialValue = 1000
    )
    private Long id;

    @Column(columnDefinition = "text", unique = false)
    private String description;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}