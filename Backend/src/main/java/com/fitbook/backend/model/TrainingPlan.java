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

    @Column(columnDefinition = "text", unique = false)
    private String description;

    @JoinColumn(name ="trainingType")
    @ManyToOne
    private TrainingType trainingType;

    @JoinColumn(name ="trainingLength")
    @ManyToOne
    private TrainingLength trainingLength;

    @JoinColumn(name ="trainingIntensity")
    @ManyToOne
    private TrainingIntensity trainingIntensity;

    @JoinColumn(name ="trainingDifficulty")
    @ManyToOne
    private TrainingDifficulty trainingDifficulty;

    public TrainingPlan() {
    }

    public TrainingPlan(String name, String description, TrainingType trainingType, TrainingLength trainingLength, TrainingIntensity trainingIntensity, TrainingDifficulty trainingDifficulty) {
        this.name = name;
        this.description = description;
        this.trainingType = trainingType;
        this.trainingLength = trainingLength;
        this.trainingIntensity = trainingIntensity;
        this.trainingDifficulty = trainingDifficulty;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TrainingType getTrainingType() {
        return trainingType;
    }

    public void setTrainingType(TrainingType trainingType) {
        this.trainingType = trainingType;
    }

    public TrainingLength getTrainingLength() {
        return trainingLength;
    }

    public void setTrainingLength(TrainingLength trainingLength) {
        this.trainingLength = trainingLength;
    }

    public TrainingIntensity getTrainingIntensity() {
        return trainingIntensity;
    }

    public void setTrainingIntensity(TrainingIntensity trainingIntensity) {
        this.trainingIntensity = trainingIntensity;
    }

    public TrainingDifficulty getTrainingDifficulty() {
        return trainingDifficulty;
    }

    public void setTrainingDifficulty(TrainingDifficulty trainingDifficulty) {
        this.trainingDifficulty = trainingDifficulty;
    }

    @Override
    public boolean equals(Object obj) {
        TrainingPlan trainingPlan = (TrainingPlan) obj;
        return this.name.equals(trainingPlan.getName()) && this.description.equals(trainingPlan.getDescription())
                && trainingPlan.getTrainingDifficulty().getId().equals(this.trainingDifficulty.getId()) && trainingPlan.getTrainingIntensity().getId().equals(this.getTrainingIntensity().getId())
                && trainingPlan.getTrainingLength().getId().equals(this.getTrainingLength().getId()) && trainingPlan.getTrainingType().getId().equals(this.getTrainingType().getId());
    }
}
