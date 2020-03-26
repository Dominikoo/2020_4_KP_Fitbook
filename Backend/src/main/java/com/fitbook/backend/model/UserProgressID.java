package com.fitbook.backend.model;

import javax.persistence.Embeddable;
import java.io.Serializable;


public class UserProgressID implements Serializable {

    protected User user;
    protected TrainingSessionExercise trainingSessionExercise;

    public UserProgressID() {}

    public UserProgressID(User user, TrainingSessionExercise trainingSessionExercise) {
        this.user = user;
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
