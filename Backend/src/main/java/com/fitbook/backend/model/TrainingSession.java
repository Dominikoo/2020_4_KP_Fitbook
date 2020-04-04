package com.fitbook.backend.model;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Training_Sessions")
public class TrainingSession {


    @Id
    @GeneratedValue(generator = "training_session_generator")
    @SequenceGenerator(
            name = "training_session_generator",
            sequenceName = "training_session_sequence",
            initialValue = 1000
    )
    private Long id;

    @JoinColumn(name ="trainingPlan")
    @ManyToOne
    private TrainingPlan trainingPlan;

    @Column(columnDefinition = "text", unique = false)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TrainingPlan getTrainingPlan() {
        return trainingPlan;
    }

    public void setTrainingPlan(TrainingPlan trainingPlan) {
        this.trainingPlan = trainingPlan;
    }

    public Long getId() {
        return id;
    }
}
