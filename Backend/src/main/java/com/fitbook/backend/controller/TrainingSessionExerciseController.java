package com.fitbook.backend.controller;

import com.fitbook.backend.model.TrainingSession;
import com.fitbook.backend.model.TrainingSessionExercise;
import com.fitbook.backend.repository.TrainingSessionExerciseRepository;
import com.fitbook.backend.repository.TrainingSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TrainingSessionExerciseController {

    @Autowired
    private TrainingSessionExerciseRepository trainingSessionExerciseRepository;

    @GetMapping("/auth/trainingSessionExercises/all/{trainingSessionId}")
    public List<TrainingSessionExercise> getTrainingSessionExercises(@PathVariable Long trainingSessionId){
        return trainingSessionExerciseRepository.getTrainingSessionExercises(trainingSessionId);
    }
}
