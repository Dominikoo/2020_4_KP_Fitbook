package com.fitbook.backend.controller;

import com.fitbook.backend.model.Post;
import com.fitbook.backend.model.PostComment;
import com.fitbook.backend.model.PostLike;
import com.fitbook.backend.repository.PostCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;
import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class PostCommentController {

    @Autowired
    private PostCommentRepository postCommentRepository;

    @PostMapping("/auth/comment")
    public PostComment postComment(@RequestBody PostComment newPostComment) {
        if(newPostComment.getPublicationDate() == null) newPostComment.setPublicationDate(LocalDate.now());
        return postCommentRepository.save(newPostComment);
    }

    @GetMapping("/auth/comment/{postId}")
    public List<PostComment> getCommentsByPostId(@PathVariable Long postId){
        return postCommentRepository.getPostCommentsByPostId(postId);
    }

    @DeleteMapping("/auth/comment/{commentId}")
    public PostComment deleteComment(@PathVariable Long commentId){
        Optional<PostComment> postComment = postCommentRepository.findById(commentId);
        if(postComment.isPresent()){
            postCommentRepository.delete(postComment.get());
            return postComment.get();
        }
        return null;
    }
}
