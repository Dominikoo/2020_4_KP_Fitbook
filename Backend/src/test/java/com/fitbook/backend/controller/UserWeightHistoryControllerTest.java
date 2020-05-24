package com.fitbook.backend.controller;

import com.fitbook.backend.model.UserWeightHistory;
import com.fitbook.backend.repository.UserRepository;
import com.fitbook.backend.repository.UserWeightHistoryRepository;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserWeightHistoryControllerTest {

    @Autowired
    private UserWeightHistoryRepository userWeightHistoryRepository;
    @Autowired
    private UserWeightHistoryController userWeightHistoryController;
    @Autowired
    private UserRepository userRepository;

    UserWeightHistory testUserWeight;

    @Before
    public void init(){
        testUserWeight = userWeightHistoryRepository.save(new UserWeightHistory(userRepository.findAll().get(0), 60.0, LocalDate.now(), null));
    }

    @After
    public void clear() {
        userWeightHistoryRepository.delete(testUserWeight);
    }

    @Test
    public void getAllUserWeightHistory() {
        String userWeightHistory = userWeightHistoryController.getAllUserWeightHistory(testUserWeight.getUser().getLogin());
        Assert.assertTrue(userWeightHistory.contains("\"value\": 60.0"));
    }

    @Test
    public void existUserWeightHistory() {
        Assert.assertTrue(userWeightHistoryController.existUserWeightHistory(testUserWeight.getUser().getLogin(), testUserWeight.getDate()));
    }
}