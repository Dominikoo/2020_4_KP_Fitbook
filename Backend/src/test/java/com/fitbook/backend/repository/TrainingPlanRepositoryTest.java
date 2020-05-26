package com.fitbook.backend.repository;

import com.fitbook.backend.controller.TrainingPlanController;
import com.fitbook.backend.model.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TrainingPlanRepositoryTest {

    @Autowired
    private TrainingPlanRepository trainingPlanRepository;
    @Autowired
    private TrainingTypeRepository trainingTypeRepository;
    @Autowired
    private TrainingLengthRepository trainingLengthRepository;
    @Autowired
    private TrainingDifficultyRepository trainingDifficultyRepository;
    @Autowired
    private TrainingIntensityRepository trainingIntensityRepository;
    @Autowired
    private UserRepository userRepository;

    private TrainingPlan testTrainingPlan;
    private ArrayList<Long> typeIds;
    private ArrayList<Long> lengthIds;
    private ArrayList<Long> intensityIds;
    private ArrayList<Long> difficultyIds;
    private User user;


    @Before
    public void init(){
        TrainingType trainingType = trainingTypeRepository.findAll().get(0);
        TrainingLength trainingLength = trainingLengthRepository.findAll().get(0);
        TrainingIntensity trainingIntensity = trainingIntensityRepository.findAll().get(0);
        TrainingDifficulty trainingDifficulty = trainingDifficultyRepository.findAll().get(0);
        typeIds = new ArrayList<>();
        typeIds.add(trainingType.getId());
        lengthIds = new ArrayList<>();
        lengthIds.add(trainingLength.getId());
        intensityIds = new ArrayList<>();
        intensityIds.add(trainingIntensity.getId());
        difficultyIds = new ArrayList<>();
        difficultyIds.add(trainingDifficulty.getId());
        testTrainingPlan = trainingPlanRepository.save(new TrainingPlan("test_1", "opis_testowy_1", trainingType,
                trainingLength, trainingIntensity, trainingDifficulty, false, true));
        TrainingPlanController trainingPlanController = new TrainingPlanController();
        user = userRepository.findAll().get(0);
        trainingPlanController.postTrainingPlan(testTrainingPlan, user.getLogin());
    }

    @After
    public void clear() {
        trainingPlanRepository.delete(testTrainingPlan);
    }

    @Test
    public void getFilteredTrainingPlansTest() {
        assertTrue(trainingPlanRepository.getPublicFilteredTrainingPlans(difficultyIds, intensityIds, lengthIds, typeIds).contains(testTrainingPlan));
    }

    @Test
    public void getFilteredTrainingPlansForUserTest() {
        assertTrue(trainingPlanRepository.getFilteredTrainingPlansForUser(difficultyIds, intensityIds, lengthIds, typeIds, user.getLogin()).contains(testTrainingPlan));
    }
}