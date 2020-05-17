package com.fitbook.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name = "UserConnections")
public class UserConnection {
    @Id
    @GeneratedValue(generator = "user_connections_generator")
    @SequenceGenerator(
            name = "user_connections_generator",
            sequenceName = "user_connections_sequence",
            initialValue = 1000
    )
    private Long id;

    @ManyToOne
    private User firstUser;

    @ManyToOne
    private User secondUser;

    @Column(columnDefinition = "int")
    private Integer status; // 0 - brak, 1 - znajomi, 2 - został zaproszony, 3 - zaprosił

    public UserConnection() {
    }

    public UserConnection(User firstUser, User secondUser, Integer status) {
        this.firstUser = firstUser;
        this.secondUser = secondUser;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getFirstUser() {
        return firstUser;
    }

    public void setFirstUser(User firstUser) {
        this.firstUser = firstUser;
    }

    public User getSecondUser() {
        return secondUser;
    }

    public void setSecondUser(User secondUser) {
        this.secondUser = secondUser;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
