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

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserProgressControllerTest {

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
    @Autowired
    private UserProgressController userProgressController;

    private TrainingPlan trainingPlan;
    private User user;
    private TrainingSession trainingSession;
    private TrainingSessionExercise trainingSessionExercise;
    private UserProgress userProgress;

    @Before
    public void init(){
        TrainingType trainingType = trainingTypeRepository.findAll().get(0);
        TrainingLength trainingLength = trainingLengthRepository.findAll().get(0);
        TrainingIntensity trainingIntensity = trainingIntensityRepository.findAll().get(0);
        TrainingDifficulty trainingDifficulty = trainingDifficultyRepository.findAll().get(0);
        trainingPlan = trainingPlanRepository.save(new TrainingPlan("test_1", "opis_testowy_1", trainingType,
                trainingLength, trainingIntensity, trainingDifficulty, false, true));
        TrainingPlanController trainingPlanController = new TrainingPlanController();
        user = userRepository.findAll().get(0);
        trainingPlanController.postTrainingPlan(trainingPlan, user.getLogin());
        trainingSession = trainingSessionRepository.save(new TrainingSession(trainingPlan, "test_session", 1));
        Exercise exercise = exerciseRepository.findAll().get(0);
        trainingSessionExercise = trainingSessionExerciseRepository.save(new TrainingSessionExercise(exercise, trainingSession, 1));
        userProgress = userProgressRepository.save(new UserProgress(user, trainingSessionExercise, 0));
    }

    @After
    public void clear() {
        userProgressRepository.delete(userProgress);
        trainingSessionExerciseRepository.delete(trainingSessionExercise);
        trainingSessionRepository.delete(trainingSession);
        trainingPlanRepository.delete(trainingPlan);
    }

    @Test
    public void getUserProgressTest() {
        assertTrue(userProgressController.getUserProgress(userProgress.getTrainingSessionExercise().getTrainingSession().getId()).contains(userProgress));
    }
    
}