package com.fitbook.backend.repository;

import com.fitbook.backend.model.User;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    User testUser;

    @Before
    public void init(){
        testUser = userRepository.save(new User("test_user", "test@email.com", "safe_password", "test_name", "test_last_name", "test_nickname"));
    }

    @After
    public void clear() {
        userRepository.delete(testUser);
    }

    @Test
    public void getUserByLoginTest() {
         User user = userRepository.getUserByLogin("test_user");
         assertEquals(testUser.getId(), user.getId());
    }
}