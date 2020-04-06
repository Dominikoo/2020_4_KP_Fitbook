package com.fitbook.backend.model;

import java.io.Serializable;


public class UserProgressID implements Serializable {

    protected Long user;
    protected Long trainingSessionExercise;

    public UserProgressID() {}

    public UserProgressID(Long user, Long trainingSessionExercise) {
        this.user = user;
        this.trainingSessionExercise = trainingSessionExercise;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Long getTrainingSessionExercise() {
        return trainingSessionExercise;
    }

    public void setTrainingSessionExercise(Long trainingSessionExercise) {
        this.trainingSessionExercise = trainingSessionExercise;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UserProgressID other = (UserProgressID) obj;
        if (!user.equals(other.user))
            return false;
        else if(!trainingSessionExercise.equals(other.trainingSessionExercise))
            return false;
        return true;
    }

    @Override
    public int hashCode() {                         // TODO: Implement viable hashcode override if anything bad happens to database
        return super.hashCode();
    }
}
