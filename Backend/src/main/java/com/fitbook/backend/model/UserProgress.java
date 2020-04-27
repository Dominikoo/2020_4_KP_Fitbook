package com.fitbook.backend.model;


import javax.persistence.*;
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
    private Integer progress;

    public UserProgress(){};

    public UserProgress(User user, TrainingSessionExercise trainingSessionExercise, Integer progress) {
        this.user = user;
        this.trainingSessionExercise = trainingSessionExercise;
        this.progress = progress;
    }

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

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UserProgress other = (UserProgress) obj;
        return user.getLogin().equals(other.getUser().getLogin()) && trainingSessionExercise.getId().equals(other.getTrainingSessionExercise().getId());
    }
}
