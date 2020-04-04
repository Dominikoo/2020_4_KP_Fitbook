package com.fitbook.backend.controller;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.TrainingSession;
import com.fitbook.backend.repository.TrainingSessionExerciseRepository;
import com.fitbook.backend.repository.TrainingSessionRepository;
import com.fitbook.backend.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TrainingSessionController {

    @Autowired
    private TrainingSessionRepository trainingSessionRepository;

    @Autowired
    private TrainingSessionExerciseRepository trainingSessionExerciseRepository;

    @GetMapping("/auth/trainingSessions/all")
    public List<TrainingSession> getAllTrainingSessions(){
        return trainingSessionRepository.findAll();
    }

    @GetMapping("/auth/trainingSessions/all/{trainingPlanId}")
    public List<TrainingSession> getTrainingSessionByTrainingId(@PathVariable Long trainingPlanId){
        return trainingSessionRepository.getTrainingPlanSession(trainingPlanId);
    }
}
