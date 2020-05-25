package com.fitbook.backend.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Shared_Chart_Data")
public class SharedChartData {
    @Id
    @GeneratedValue(generator = "shared_chart_data_generator")
    @SequenceGenerator(
            name = "shared_chart_data_generator",
            sequenceName = "shared_chart_data_sequence",
            initialValue = 1000
    )
    private Long id;

    @JoinColumn(name ="post_id")
    @ManyToOne
    private Post post;

    @Column(columnDefinition = "real")
    private Integer value;

    @Column(columnDefinition = "date")
    private LocalDate date;

    public SharedChartData() {
    }

    public SharedChartData(Post post, Integer value, LocalDate date) {
        this.post = post;
        this.value = value;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
