package com.fitbook.backend.model;

import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Users")
public class User{

    @Id
    @GeneratedValue(generator = "user_generator")
    @SequenceGenerator(
            name = "user_generator",
            sequenceName = "user_sequence",
            initialValue = 1000
    )
    private Long id;

    @UniqueElements
    @Size(min = 6, max = 30)
    @Column(columnDefinition = "text")
    @NotNull
    private String login;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
