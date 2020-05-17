package com.fitbook.backend.controller;

import com.fitbook.backend.model.*;
import com.fitbook.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserConnectionController userConnectionController;

    @PostMapping("/auth/post")
    public Post postPost(@RequestBody Post newPost) {
        if(newPost.getPublicationDate() == null) newPost.setPublicationDate(LocalDate.now());
        return postRepository.save(newPost);
    }

    @GetMapping("/auth/post/byUserLogin/{userLogin}")
    public List<Post> getPostsByUserLogin(@PathVariable String userLogin){
        return postRepository.getPostsByUserLogin(userLogin);
    }

    @GetMapping("/auth/post/friends/byUserLogin/{userLogin}")
    public List<Post> getFriendsPostsByUserLogin(@PathVariable String userLogin){
        List<Post> friendsPosts = new ArrayList<>();
        for(User friend : userConnectionController.getFriendsByUserLogin(userLogin)){
            friendsPosts.addAll(getPostsByUserLogin(userLogin));
        }
        return friendsPosts;
    }

    @DeleteMapping("/auth/post/{postId}")
    public Post deletePost(@PathVariable Long postId){
        Optional<Post> post = postRepository.findById(postId);
        if(post.isPresent()){
            postRepository.delete(post.get());
            return post.get();
        }
        return null;
    }
}
