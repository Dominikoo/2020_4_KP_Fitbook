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

    @Column(columnDefinition = "int", unique = false)
    private Integer orderNumber;

    public TrainingSession(){};

    public TrainingSession(TrainingPlan trainingPlan, String name, Integer orderNumber) {
        this.trainingPlan = trainingPlan;
        this.name = name;
        this.orderNumber = orderNumber;
    }

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

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrderNumber() {
        return orderNumber;
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
        TrainingSession other = (TrainingSession) obj;
        return id.equals(other.getId());
    }
}
