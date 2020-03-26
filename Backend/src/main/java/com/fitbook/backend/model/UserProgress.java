package com.fitbook.backend.model;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Entity
@IdClass(UserProgressID.class)
@Table(name = "User_Progress")
public class UserProgress implements Serializable {

    @Id
    @ManyToOne
    private User user;

    @Id
    @ManyToOne
    private TrainingSessionExercise trainingSessionExercise;

    @Column(columnDefinition = "int")
    private int progress;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TrainingSessionExercise getTrainingSessionExercise() {
        return trainingSessionExercise;
    }

    public void setTrainingSessionExercise(TrainingSessionExercise trainingSessionExercise) {
        this.trainingSessionExercise = trainingSessionExercise;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }
}
