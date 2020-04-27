package com.fitbook.backend.controller;

import com.fitbook.backend.model.User;
import com.fitbook.backend.repository.UserRepository;
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
public class UserControllerTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserController userController;

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
    public void postUserTest() {
        User testUser2 = new User("test_user2", "test2@email.com", "safe2_password", "test2_name", "test2_last_name", "test2_nickname");
        assertEquals(testUser2, userController.postUser(testUser2));
        userRepository.delete(testUser2);
    }

    @Test
    public void getUserByIdTest() {
        assertEquals(testUser, userController.getUserById(testUser.getId()));
    }

    @Test
    public void getUserByLoginTest() {
        assertEquals(testUser, userController.getUserByLogin(testUser.getLogin()));
    }

    @Test
    public void getUserByEmailTest() {
        assertEquals(testUser, userController.getUserByEmail(testUser.getEmail()));
    }

    @Test
    public void getExistUserLoginTest() {
        assertTrue(userController.getExistUserLogin(testUser.getLogin()));
    }

    @Test
    public void getExistUserEmailTest() {
        assertTrue(userController.getExistUserEmail(testUser.getEmail()));
    }
}