package com.fitbook.backend.controller;

import com.fitbook.backend.model.TrainingSessionExercise;
import com.fitbook.backend.model.UserProgress;
import com.fitbook.backend.repository.TrainingSessionExerciseRepository;
import com.fitbook.backend.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserProgressController {
    @Autowired
    private UserProgressRepository userProgressRepository;

    @GetMapping("/auth/userProgress/all/{trainingSessionId}")
    public List<UserProgress> getUserProgress(@PathVariable Long trainingSessionId){
        return userProgressRepository.getProgressByTrainingSessionId(trainingSessionId);
    }

    @PutMapping("/auth/userProgress/put")
    public UserProgress putUserProgress(@RequestBody UserProgress userProgress){
        userProgressRepository.save(userProgress);
        return userProgress;
    }

}
