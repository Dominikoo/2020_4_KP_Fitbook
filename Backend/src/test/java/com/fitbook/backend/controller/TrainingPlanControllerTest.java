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

    private TrainingPlan testTrainingPlanPublic;
    private TrainingPlan testTrainingPlanPrivate;
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
        testTrainingPlanPublic = trainingPlanRepository.save(new TrainingPlan("test_1", "opis_testowy_1", trainingType,
                trainingLength, trainingIntensity, trainingDifficulty, false, true));
        trainingPlanController.postTrainingPlan(testTrainingPlanPublic, user.getLogin());
        testTrainingPlanPrivate = trainingPlanRepository.save(new TrainingPlan("test_1", "opis_testowy_1", trainingType,
                trainingLength, trainingIntensity, trainingDifficulty, true, true));
        trainingPlanController.postTrainingPlan(testTrainingPlanPrivate, user.getLogin());
    }

    @After
    public void clear() {
        List<TrainingPlan> trainingPlansToRemove = new ArrayList<>();
        trainingPlansToRemove.add(testTrainingPlanPrivate);
        trainingPlansToRemove.add(testTrainingPlanPublic);
        for(TrainingPlan tp : trainingPlansToRemove){
            List<TrainingSession> trainingSessions = trainingSessionRepository.getTrainingPlanSession(tp.getId());
            List<TrainingSessionExercise> trainingSessionExercises = trainingSessionExerciseRepository.getTrainingSessionExercises(trainingSessions.get(0).getId());
            List<UserProgress> userProgresses = userProgressRepository.getProgressByTrainingSessionId(trainingSessions.get(0).getId());
            userProgressRepository.delete(userProgresses.get(0));
            trainingSessionExerciseRepository.delete(trainingSessionExercises.get(0));
            trainingSessionRepository.delete(trainingSessions.get(0));
            trainingPlanRepository.delete(tp);
        }
    }

    @Test
    public void getFilteredTrainingPlans() {
        assertTrue(trainingPlanController.getPublicFilteredTrainingPlans(filterParameters).contains(testTrainingPlanPublic));
    }

    @Test
    public void getFilteredTrainingPlansForUser() {
        assertTrue(trainingPlanController.getFilteredTrainingPlansForUser(filterParameters, user.getLogin(), 0).contains(testTrainingPlanPrivate));
    }

    @Test
    public void postTrainingPlan() {
        TrainingPlan postedTrainingPlan = trainingPlanController.postTrainingPlan(new TrainingPlan("t1", "o1",
                testTrainingPlanPrivate.getTrainingType(), testTrainingPlanPrivate.getTrainingLength(), testTrainingPlanPrivate.getTrainingIntensity(),
                testTrainingPlanPrivate.getTrainingDifficulty(), false, false), user.getLogin());
        assertNotNull(trainingPlanRepository.findById(postedTrainingPlan.getId()));
    }
}