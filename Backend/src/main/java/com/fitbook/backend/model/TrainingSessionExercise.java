package com.fitbook.backend.model;


import javax.persistence.*;

@Entity
@Table(name = "Training_Session_Exercises")
public class TrainingSessionExercise {

    @Id
    @GeneratedValue(generator = "training_session_exercise_generator")
    @SequenceGenerator(
            name = "training_session_exercise_generator",
            sequenceName = "training_session_exercise_sequence",
            initialValue = 1000
    )
    private Long id;

    @JoinColumn
    @ManyToOne
    private Exercise exercise;

    @JoinColumn
    @ManyToOne
    private TrainingSession trainingSession;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public TrainingSession getTrainingSession() {
        return trainingSession;
    }

    public void setTrainingSession(TrainingSession trainingSession) {
        this.trainingSession = trainingSession;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        TrainingSessionExercise other = (TrainingSessionExercise) obj;
        if (id != other.id)
            return false;
        return true;
    }
}
