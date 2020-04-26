package com.fitbook.backend.controller;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.TrainingSession;
import com.fitbook.backend.model.UserProgress;
import com.fitbook.backend.repository.ExerciseRepository;
import com.fitbook.backend.repository.TrainingSessionExerciseRepository;
import com.fitbook.backend.repository.TrainingSessionRepository;
import com.fitbook.backend.repository.UserProgressRepository;
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
    public void postTrainingSessionExercises(@RequestBody ArrayList<TrainingSession> sessionsToAdd) {
        // TODO: implement this
    }

    @PutMapping("/auth/trainingSessions/delete")
    public void deleteTrainingSessionExercises(@RequestBody ArrayList<TrainingSession> sessionsToDelete) {
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
