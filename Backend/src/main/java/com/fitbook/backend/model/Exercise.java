package com.fitbook.backend.model;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "Exercises")
public class Exercise {

    @Id
    @GeneratedValue(generator = "exercise_generator")
    @SequenceGenerator(
            name = "exercise_generator",
            sequenceName = "exercise_sequence",
            initialValue = 1000
    )
    private Long id;

    @Column(columnDefinition = "text", unique = false)
    @NotEmpty
    private String name;

    @Column(columnDefinition = "text", unique = false)
    private String description;


    @Column(columnDefinition = "int")
    private int sets;

    @Column(columnDefinition = "int")
    private int reps;

    @Column(columnDefinition = "int")
    private int lengthInSecondsPerSet;

    public Exercise() {
    }

    public Exercise(@NotEmpty String name, String description, int sets, int reps, int lengthInSecondsPerSet) {
        this.name = name;
        this.description = description;
        this.sets = sets;
        this.reps = reps;
        this.lengthInSecondsPerSet = lengthInSecondsPerSet;
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

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) { this.sets = sets; }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) { this.reps = reps; }

    public int getLengthInSecondsPerSet() {
        return lengthInSecondsPerSet;
    }

    public void setLengthInSecondsPerSet(int lengthInSecondsPerSet) { this.lengthInSecondsPerSet = lengthInSecondsPerSet; }
}
