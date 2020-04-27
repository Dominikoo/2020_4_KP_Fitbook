package com.fitbook.backend.repository;

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
public class TrainingSessionExerciseRepositoryTest {

    @Autowired
    private TrainingPlanRepository trainingPlanRepository;
    @Autowired
    private TrainingSessionRepository trainingSessionRepository;
    @Autowired
    private TrainingSessionExerciseRepository trainingSessionExerciseRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private TrainingTypeRepository trainingTypeRepository;
    @Autowired
    private TrainingLengthRepository trainingLengthRepository;
    @Autowired
    private TrainingDifficultyRepository trainingDifficultyRepository;
    @Autowired
    private TrainingIntensityRepository trainingIntensityRepository;

    private TrainingSession trainingSession;
    private TrainingPlan trainingPlan;
    private TrainingSessionExercise trainingSessionExercise;

    @Before
    public void init(){
        TrainingType trainingType = trainingTypeRepository.findAll().get(0);
        TrainingLength trainingLength = trainingLengthRepository.findAll().get(0);
        TrainingIntensity trainingIntensity = trainingIntensityRepository.findAll().get(0);
        TrainingDifficulty trainingDifficulty = trainingDifficultyRepository.findAll().get(0);
        trainingPlan = trainingPlanRepository.save(new TrainingPlan("test_1", "opis_testowy_1", trainingType,
                trainingLength, trainingIntensity, trainingDifficulty));
        trainingSession = trainingSessionRepository.save(new TrainingSession(trainingPlan, "test_session", 1));
        Exercise exercise = exerciseRepository.findAll().get(0);
        trainingSessionExercise = trainingSessionExerciseRepository.save(new TrainingSessionExercise(exercise, trainingSession, 1));
    }

    @After
    public void clear() {
        trainingSessionExerciseRepository.delete(trainingSessionExercise);
        trainingSessionRepository.delete(trainingSession);
        trainingPlanRepository.delete(trainingPlan);
    }


    @Test
    public void getTrainingSessionExercisesTest() {
        TrainingSessionExercise gotTrainingSessionExercise = trainingSessionExerciseRepository.getTrainingSessionExercises(trainingSession.getId()).get(0);
        assertEquals(trainingSessionExercise, gotTrainingSessionExercise);
    }
}