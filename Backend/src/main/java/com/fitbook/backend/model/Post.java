package com.fitbook.backend.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Posts")
public class Post {
    @Id
    @GeneratedValue(generator = "post_generator")
    @SequenceGenerator(
            name = "post_generator",
            sequenceName = "post_sequence",
            initialValue = 1000
    )
    private Long id;

    @ManyToOne
    private User user;

    @Column(columnDefinition = "text")
    private String content;

    @Column(columnDefinition = "date")
    private LocalDate publicationDate;

    @Column(columnDefinition = "int")
    private Integer type; // 1 - simple text, 2 - shared training plan, 3 - shared weight

    @JoinColumn(name ="trainingPlan")
    @ManyToOne
    private TrainingPlan sharedTrainingPlan;

    public Post() {
    }

    public Post(User user, String content, LocalDate publicationDate, Integer type, TrainingPlan sharedTrainingPlan) {
        this.user = user;
        this.content = content;
        this.publicationDate = publicationDate;
        this.type = type;
        this.sharedTrainingPlan = sharedTrainingPlan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public TrainingPlan getSharedTrainingPlan() {
        return sharedTrainingPlan;
    }

    public void setSharedTrainingPlan(TrainingPlan sharedTrainingPlan) {
        this.sharedTrainingPlan = sharedTrainingPlan;
    }
}
