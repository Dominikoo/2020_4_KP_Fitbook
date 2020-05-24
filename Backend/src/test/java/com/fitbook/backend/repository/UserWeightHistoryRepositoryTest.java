package com.fitbook.backend.repository;

import com.fitbook.backend.model.UserWeightHistory;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.*;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserWeightHistoryRepositoryTest {

    @Autowired
    private UserWeightHistoryRepository userWeightHistoryRepository;
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
    public void getUserWeightHistory() {
        List<UserWeightHistory> userWeightHistoryList = userWeightHistoryRepository.getUserWeightHistory(testUserWeight.getUser().getLogin());
        Assert.assertTrue(userWeightHistoryList.contains(testUserWeight));
    }

    @Test
    public void getUserWeightHistoryByUserAndDate() {
        UserWeightHistory userWeightHistory = userWeightHistoryRepository.getUserWeightHistoryByUserAndDate(testUserWeight.getUser().getLogin(), testUserWeight.getDate());
        Assert.assertNotNull(userWeightHistory);
    }
}