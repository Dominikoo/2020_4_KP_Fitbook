package com.fitbook.backend.repository;

import com.fitbook.backend.model.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.swing.text.Style;
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

    @Test
    public void getFilteredTrainingPlans() {
        TrainingType trainingType = trainingTypeRepository.findAll().get(0);
        TrainingLength trainingLength = trainingLengthRepository.findAll().get(0);
        TrainingIntensity trainingIntensity = trainingIntensityRepository.findAll().get(0);
        TrainingDifficulty trainingDifficulty = trainingDifficultyRepository.findAll().get(0);
        TrainingPlan testTrainingPlan = new TrainingPlan("test_1", "opis_testowy_1", trainingType,
                trainingLength, trainingIntensity, trainingDifficulty);
        testTrainingPlan = trainingPlanRepository.save(testTrainingPlan);
        ArrayList<Long> typeIds = new ArrayList<>();
        typeIds.add(trainingType.getId());
        ArrayList<Long> lengthIds = new ArrayList<>();
        lengthIds.add(trainingLength.getId());
        ArrayList<Long> intensityIds = new ArrayList<>();
        intensityIds.add(trainingIntensity.getId());
        ArrayList<Long> difficultyIds = new ArrayList<>();
        difficultyIds.add(trainingDifficulty.getId());
        System.out.println(trainingPlanRepository.getFilteredTrainingPlans(difficultyIds, intensityIds, lengthIds, typeIds).contains(testTrainingPlan));
        assertTrue(trainingPlanRepository.getFilteredTrainingPlans(difficultyIds, intensityIds, lengthIds, typeIds).contains(testTrainingPlan));
    }

    @Test
    public void getFilteredTrainingPlansForUser() {
    }
}