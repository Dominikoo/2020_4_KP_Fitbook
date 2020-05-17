package com.fitbook.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "Post_Likes")
public class PostLike {
    @Id
    @GeneratedValue(generator = "post_like_generator")
    @SequenceGenerator(
            name = "post_like_generator",
            sequenceName = "post_like_sequence",
            initialValue = 1000
    )
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;

    public PostLike() {
    }

    public PostLike(User user, Post post) {
        this.user = user;
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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
