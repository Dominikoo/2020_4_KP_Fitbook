package com.fitbook.backend.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "User_Weight_History")
public class UserWeightHistory {
    @Id
    @GeneratedValue(generator = "user_weight_history_generator")
    @SequenceGenerator(
            name = "user_weight_history_generator",
            sequenceName = "user_weight_history_sequence",
            initialValue = 1000
    )
    private Long id;

    @JoinColumn(name ="user")
    @ManyToOne
    private User user;

    @Column(columnDefinition = "real")
    private Double weight;

    @Column(columnDefinition = "date")
    private LocalDate date;

    public UserWeightHistory() {
    }

    public UserWeightHistory(User user, Double weight, LocalDate date) {
        this.user = user;
        this.weight = weight;
        this.date = date;
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

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
