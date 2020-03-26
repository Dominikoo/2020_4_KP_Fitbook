package com.fitbook.backend.model;


import javax.persistence.*;

@Entity
@Table(name = "Training_Plans")
public class TrainingPlan {

    @Id
    @GeneratedValue(generator = "training_plan_generator")
    @SequenceGenerator(
            name = "training_plan_generator",
            sequenceName = "training_plan_sequence",
            initialValue = 1000
    )
    private Long id;

    @Column(columnDefinition = "text", unique = false)
    private String name;

    @JoinColumn(name ="trainingType")
    @ManyToOne
    private TrainingType trainingType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TrainingType getTrainingType() {
        return trainingType;
    }

    public void setTrainingType(TrainingType trainingType) {
        this.trainingType = trainingType;
    }


}
