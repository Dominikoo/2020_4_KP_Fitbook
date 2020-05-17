package com.fitbook.backend.controller;

import com.fitbook.backend.model.Post;
import com.fitbook.backend.model.PostComment;
import com.fitbook.backend.model.PostLike;
import com.fitbook.backend.repository.PostLikeRepository;
import com.fitbook.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class PostLikeController {

    @Autowired
    private PostLikeRepository postLikeRepository;

    @PostMapping("/auth/postLike")
    public PostLike postLike(@RequestBody PostLike newPostLike) {
        return postLikeRepository.save(newPostLike);
    }

    @GetMapping("/auth/postLike/{postId}")
    public List<PostLike> getLikesByPostId(@PathVariable Long postId){
        return postLikeRepository.getPostLikesByPostId(postId);
    }

    @DeleteMapping("/auth/postLike/{userLogin}/{postId}")
    public PostLike deletePostLike(@PathVariable String userLogin, @PathVariable Long postId){
        PostLike postLike = postLikeRepository.getPostLikeByLoginAndPostId(userLogin, postId);
        if(postLike != null) postLikeRepository.delete(postLike);
        return postLike;
    }
}
