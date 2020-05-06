package com.fitbook.backend.controller;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.TrainingSession;
import com.fitbook.backend.model.UserProgress;
import com.fitbook.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TrainingSessionController {

    @Autowired
    private TrainingSessionRepository trainingSessionRepository;

    @Autowired
    private TrainingPlanRepository trainingPlanRepository;

    @Autowired
    private TrainingSessionExerciseRepository trainingSessionExerciseRepository;

    @Autowired
    private UserProgressRepository userProgressRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @GetMapping("/auth/trainingSessions/all")
    public List<TrainingSession> getAllTrainingSessions(){
        return trainingSessionRepository.findAll();
    }

    @GetMapping("/auth/trainingSessions/all/{trainingPlanId}")
    public List<TrainingSession> getTrainingSessionByTrainingId(@PathVariable Long trainingPlanId){
        return trainingSessionRepository.getTrainingPlanSession(trainingPlanId);
    }

    @PostMapping("/auth/trainingSessions/post")
    public void postTrainingSessions(@RequestBody ArrayList<TrainingSession> sessionsToAdd) {
        for(TrainingSession trainingSession : sessionsToAdd){
            trainingSession.setTrainingPlan(trainingPlanRepository.findById(trainingSession.getTrainingPlan().getId()).get());
            trainingSessionRepository.save(trainingSession);
        }
    }

    @PutMapping("/auth/trainingSessions/delete")
    public void deleteTrainingSessions(@RequestBody ArrayList<TrainingSession> sessionsToDelete) {
        for(TrainingSession session: sessionsToDelete){
            List<UserProgress> userProgresses = userProgressRepository.getProgressByTrainingSessionId(session.getId());
            for(UserProgress progress : userProgresses){
                userProgressRepository.delete(progress);
                trainingSessionExerciseRepository.delete(progress.getTrainingSessionExercise());
                exerciseRepository.delete(progress.getTrainingSessionExercise().getExercise());
            }
        }
    }

}
