package com.fitbook.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "Social_Group")
public class SocialGroup {
    @Id
    @GeneratedValue(generator = "social_group_generator")
    @SequenceGenerator(
            name = "social_group_generator",
            sequenceName = "social_group_sequence",
            initialValue = 1000
    )
    private Long id;

    @Column(columnDefinition = "text", unique = true)
    private String name;

    @Column(columnDefinition = "text", unique = false)
    private String description;

    @ManyToOne
    private User owner;

    public SocialGroup() {
    }

    public SocialGroup(String name, String description, User owner) {
        this.name = name;
        this.description = description;
        this.owner = owner;
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

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
