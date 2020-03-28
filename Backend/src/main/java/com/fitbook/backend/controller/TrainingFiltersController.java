package com.fitbook.backend.controller;


import com.fitbook.backend.model.TrainingDifficulty;
import com.fitbook.backend.model.TrainingIntensity;
import com.fitbook.backend.model.TrainingLength;
import com.fitbook.backend.model.TrainingType;
import com.fitbook.backend.repository.TrainingDifficultyRepository;
import com.fitbook.backend.repository.TrainingIntensityRepository;
import com.fitbook.backend.repository.TrainingLengthRepository;
import com.fitbook.backend.repository.TrainingTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TrainingFiltersController {

    @Autowired
    TrainingDifficultyRepository trainingDifficultyRepository;

    @Autowired
    TrainingLengthRepository trainingLengthRepository;

    @Autowired
    TrainingIntensityRepository trainingIntensityRepository;

    @Autowired
    TrainingTypeRepository trainingTypeRepository;

    @GetMapping("/auth/trainingDiffs")
    public List<TrainingDifficulty> getTrainingDifficulties() {
        return trainingDifficultyRepository.findAll();
    }

    @GetMapping("/auth/trainingIntensities")
    public List<TrainingIntensity> getTrainingIntensities() {
        return trainingIntensityRepository.findAll();
    }

    @GetMapping("/auth/trainingLengths")
    private List<TrainingLength> getTrainingLengths() {
        return trainingLengthRepository.findAll();
    }

    @GetMapping("/auth/trainingTypes")
    private List<TrainingType> getTrainingTypes() {
        return trainingTypeRepository.findAll();
    }
}
