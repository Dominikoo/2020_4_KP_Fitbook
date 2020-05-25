package com.fitbook.backend.controller;

import com.fitbook.backend.model.Post;
import com.fitbook.backend.repository.PostRepository;
import com.fitbook.backend.repository.UserRepository;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostControllerTest {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostController postController;
    @Autowired
    private UserRepository userRepository;

    Post testPost;

    @Before
    public void init(){
        testPost = postRepository.save(new Post(userRepository.findAll().get(0), "content", LocalDate.now(), 1, null));
    }

    @After
    public void clear() {
        postRepository.delete(testPost);
    }

    @Test
    public void postPost() {
        Post testPost2 = postController.postPost(new Post(userRepository.findAll().get(0), "content2", LocalDate.now(), 1, null));
        Assert.assertTrue(postController.getPostsByUserLogin(testPost.getUser().getLogin()).contains(testPost2));
    }

    @Test
    public void getPostsByUserLogin() {
        Assert.assertTrue(postController.getPostsByUserLogin(testPost.getUser().getLogin()).contains(testPost));
    }

    @Test
    public void deletePost() {
        Post testPost3 = postRepository.save(new Post(userRepository.findAll().get(0), "content3", LocalDate.now(), 1, null));
        Assert.assertTrue(postController.getPostsByUserLogin(testPost.getUser().getLogin()).contains(testPost3));
        postController.deletePost(testPost3.getId());
        Assert.assertFalse(postController.getPostsByUserLogin(testPost.getUser().getLogin()).contains(testPost3));
    }
}