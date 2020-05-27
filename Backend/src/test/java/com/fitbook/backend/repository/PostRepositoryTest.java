package com.fitbook.backend.repository;

import com.fitbook.backend.model.Post;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostRepositoryTest {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    Post testPost;

    @Before
    public void init(){
        testPost = postRepository.save(new Post(userRepository.findAll().get(0), "content", LocalDateTime.now(), 1, null, null));
    }

    @After
    public void clear() {
        postRepository.delete(testPost);
    }

    @Test
    public void getPostsByUserLogin() {
        Assert.assertTrue(postRepository.getPostsByUserLogin(testPost.getUser().getLogin()).contains(testPost));
    }
}