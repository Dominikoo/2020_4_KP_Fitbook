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

    @Column(columnDefinition = "int")
    private Integer orderNumber;

    public TrainingSessionExercise(){};

    public TrainingSessionExercise(Exercise exercise, TrainingSession trainingSession, Integer orderNumber) {
        this.exercise = exercise;
        this.trainingSession = trainingSession;
        this.orderNumber = orderNumber;
    }

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

    public int getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(int orderNumber) {
        this.orderNumber = orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
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
        if (! id.equals(other.id))
            return false;
        return true;
    }
}
