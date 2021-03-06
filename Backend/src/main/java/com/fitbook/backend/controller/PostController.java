package com.fitbook.backend.controller;

import com.fitbook.backend.model.*;
import com.fitbook.backend.repository.PostRepository;
import com.fitbook.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class PostController {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserConnectionController userConnectionController;
    @Autowired
    private UserWeightHistoryController userWeightHistoryController;
    @Autowired
    private SharedChartDataController sharedChartDataController;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/auth/post")
    public Post postPost(@RequestBody Post newPost) {
        if(newPost.getPublicationDate() == null) newPost.setPublicationDate(LocalDateTime.now());
        if(newPost.getType() == 1){
            return postRepository.save(newPost);
        }
        else if(newPost.getType() == 2){
            return postRepository.save(newPost);
        }
        else if(newPost.getType() == 3){
            Optional<User> user = userRepository.findById(newPost.getUser().getId());
            if(user.isPresent()){
                newPost.setUser(user.get());
                Post post = postRepository.save(newPost);
                if(post != null) userWeightHistoryController.copyWeightForPost(post);
                return post;
            }
            return null;
        }
        else if(newPost.getType() == 4){
            Optional<User> user = userRepository.findById(newPost.getUser().getId());
            if(user.isPresent()){
                newPost.setUser(user.get());
                Post post = postRepository.save(newPost);
                if(post != null) sharedChartDataController.copyNumberOfFinishedExercisesForPost(post);
                return post;
            }
        }
        return null;
    }

    @GetMapping("/auth/post/byUserLogin/{userLogin}")
    public List<Post> getPostsByUserLogin(@PathVariable String userLogin){
        return postRepository.getPostsByUserLogin(userLogin);
    }

    @GetMapping("/auth/post/friends/byUserLogin/{userLogin}")
    public List<Post> getFriendsPostsByUserLogin(@PathVariable String userLogin){
        List<Post> friendsPosts = new ArrayList<>();
        for(User friend : userConnectionController.getFriendsByUserLogin(userLogin)){
            friendsPosts.addAll(getPostsByUserLogin(friend.getLogin()));
        }
        friendsPosts.addAll(getPostsByUserLogin(userLogin));
        friendsPosts.sort(Comparator.comparing(Post::getPublicationDate));
        Collections.reverse(friendsPosts);
        return friendsPosts;
    }

    @GetMapping("/auth/post/byGroupId/{groupId}")
    public List<Post> getPostsByGroupId(@PathVariable Long groupId){
        return postRepository.getPostsByGroupId(groupId);
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
