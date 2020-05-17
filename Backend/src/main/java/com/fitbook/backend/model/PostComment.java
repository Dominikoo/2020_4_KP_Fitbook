package com.fitbook.backend.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Post_Comments")
public class PostComment {
    @Id
    @GeneratedValue(generator = "post_comment_generator")
    @SequenceGenerator(
            name = "post_comment_generator",
            sequenceName = "post_comment_sequence",
            initialValue = 1000
    )
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;

    @Column(columnDefinition = "text")
    private String commentContent;

    @Column(columnDefinition = "date")
    private LocalDate publicationDate;

    public PostComment() {
    }

    public PostComment(User user, Post post, String commentContent, LocalDate publicationDate) {
        this.user = user;
        this.post = post;
        this.commentContent = commentContent;
        this.publicationDate = publicationDate;
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

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public LocalDate getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }
}
