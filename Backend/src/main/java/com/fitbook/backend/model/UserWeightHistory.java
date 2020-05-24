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

    @JoinColumn(name ="user_id")
    @ManyToOne
    private User user;

    @Column(columnDefinition = "real")
    private Double weight;

    @Column(columnDefinition = "date")
    private LocalDate date;

    @JoinColumn(name ="post_id")
    @ManyToOne
    private Post post;

    public UserWeightHistory() {
    }

    public UserWeightHistory(User user, Double weight, LocalDate date, Post post) {
        this.user = user;
        this.weight = weight;
        this.date = date;
        this.post = post;
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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UserWeightHistory other = (UserWeightHistory) obj;
        return id.equals(other.id);
    }
}
