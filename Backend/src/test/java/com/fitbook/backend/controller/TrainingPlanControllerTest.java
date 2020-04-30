package com.fitbook.backend.controller;

import com.fitbook.backend.model.*;
import com.fitbook.backend.repository.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TrainingPlanControllerTest {

    @Autowired
    private TrainingPlanController trainingPlanController;
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
    @Autowired
    private TrainingSessionRepository trainingSessionRepository;
    @Autowired
    private TrainingSessionExerciseRepository trainingSessionExerciseRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private UserProgressRepository userProgressRepository;

    private TrainingPlan testTrainingPlan;
    private User user;
    HashMap<String, String> filterParameters;

    @Before
    public void init(){
        TrainingType trainingType = trainingTypeRepository.findAll().get(0);
        TrainingLength trainingLength = trainingLengthRepository.findAll().get(0);
        TrainingIntensity trainingIntensity = trainingIntensityRepository.findAll().get(0);
        TrainingDifficulty trainingDifficulty = trainingDifficultyRepository.findAll().get(0);
        filterParameters = new HashMap<>();
        filterParameters.put("difficulty", trainingDifficulty.getId().toString());
        filterParameters.put("intensity", trainingIntensity.getId().toString());
        filterParameters.put("length", trainingLength.getId().toString());
        filterParameters.put("type", trainingType.getId().toString());
        user = userRepository.findAll().get(0);
        testTrainingPlan = trainingPlanRepository.save(new TrainingPlan("test_1", "opis_testowy_1", trainingType,
                trainingLength, trainingIntensity, trainingDifficulty));
        trainingPlanController.postTrainingPlan(testTrainingPlan, user.getLogin());
    }

    @After
    public void clear() {
        List<TrainingSession> trainingSessions = trainingSessionRepository.getTrainingPlanSession(testTrainingPlan.getId());
        List<TrainingSessionExercise> trainingSessionExercises = trainingSessionExerciseRepository.getTrainingSessionExercises(trainingSessions.get(0).getId());
        List<UserProgress> userProgresses = userProgressRepository.getProgressByTrainingSessionId(trainingSessions.get(0).getId());
        userProgressRepository.delete(userProgresses.get(0));
        trainingSessionExerciseRepository.delete(trainingSessionExercises.get(0));
        trainingSessionRepository.delete(trainingSessions.get(0));
        trainingPlanRepository.delete(testTrainingPlan);
    }

    @Test
    public void getFilteredTrainingPlans() {
        assertTrue(trainingPlanController.getFilteredTrainingPlans(filterParameters).contains(testTrainingPlan));
    }

    @Test
    public void getFilteredTrainingPlansForUser() {
        assertTrue(trainingPlanController.getFilteredTrainingPlansForUser(filterParameters, user.getLogin(), 0).contains(testTrainingPlan));
    }

    @Test
    public void postTrainingPlan() {
        TrainingPlan postedTrainingPlan = trainingPlanController.postTrainingPlan(new TrainingPlan("t1", "o1",
                testTrainingPlan.getTrainingType(), testTrainingPlan.getTrainingLength(), testTrainingPlan.getTrainingIntensity(),
                testTrainingPlan.getTrainingDifficulty()), user.getLogin());
        assertNotNull(trainingPlanRepository.findById(postedTrainingPlan.getId()));
    }
}