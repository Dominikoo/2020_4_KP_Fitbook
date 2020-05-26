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
public class TrainingSessionControllerTest {

    @Autowired
    private TrainingSessionController trainingSessionController;
    @Autowired
    private TrainingSessionRepository trainingSessionRepository;
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

    TrainingSession trainingSession;
    TrainingPlan trainingPlan;
    TrainingType trainingType;
    TrainingLength trainingLength;
    TrainingIntensity trainingIntensity;
    TrainingDifficulty trainingDifficulty;

    @Before
    public void init(){
        TrainingType trainingType = trainingTypeRepository.findAll().get(0);
        TrainingLength trainingLength = trainingLengthRepository.findAll().get(0);
        TrainingIntensity trainingIntensity = trainingIntensityRepository.findAll().get(0);
        TrainingDifficulty trainingDifficulty = trainingDifficultyRepository.findAll().get(0);
        trainingPlan = trainingPlanRepository.save(new TrainingPlan("test_1", "opis_testowy_1", trainingType,
                trainingLength, trainingIntensity, trainingDifficulty, false, true));
        trainingSession = trainingSessionRepository.save(new TrainingSession(trainingPlan, "test_session", 1));
    }

    @After
    public void clear() {
        trainingSessionRepository.delete(trainingSession);
        trainingPlanRepository.delete(trainingPlan);
    }

    @Test
    public void getTrainingSessionByTrainingIdTest() {
        TrainingSession loadedTrainingSession = trainingSessionController.getTrainingSessionByTrainingId(trainingPlan.getId()).get(0);
        assertEquals(trainingSession, loadedTrainingSession);
    }
}