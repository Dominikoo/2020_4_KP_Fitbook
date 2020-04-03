package com.fitbook.backend.controller;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.TrainingSession;
import com.fitbook.backend.repository.TrainingSessionRepository;
import com.fitbook.backend.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TrainingSessionController {

    @Autowired
    private TrainingSessionRepository trainingSessionRepository;

    @GetMapping("/auth/trainingPlans/all")
    public List<TrainingSession> getAllTrainingSessions(){
        return trainingSessionRepository.findAll();
    }

    @GetMapping("/auth/trainingPlans/all/{trainingPlanId}")
    public List<TrainingSession> getTrainingSessionByTrainingId(@RequestParam Long trainingPlanId){
        return trainingSessionRepository.getTrainingPlanSession(trainingPlanId);
    }
}
