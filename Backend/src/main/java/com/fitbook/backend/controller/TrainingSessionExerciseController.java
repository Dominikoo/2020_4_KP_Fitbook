package com.fitbook.backend.controller;

import com.fitbook.backend.model.Exercise;
import com.fitbook.backend.model.TrainingSession;
import com.fitbook.backend.model.TrainingSessionExercise;
import com.fitbook.backend.model.UserProgress;
import com.fitbook.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TrainingSessionExerciseController {

    @Autowired
    private TrainingSessionExerciseRepository trainingSessionExerciseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private UserProgressRepository userProgressRepository;

    @GetMapping("/auth/trainingSessionExercises/all/{trainingSessionId}")
    public List<TrainingSessionExercise> getTrainingSessionExercises(@PathVariable Long trainingSessionId){
        return trainingSessionExerciseRepository.getTrainingSessionExercises(trainingSessionId);
    }


    @PostMapping("/auth/trainingSessionExercises/post")
    public void addTrainingSessionExercises(@RequestBody ArrayList<UserProgress> progress_new) {
        for(UserProgress item: progress_new){
            item.setUser(userRepository.getUserByLogin(item.getUser().getLogin()));
            item.getTrainingSessionExercise().setExercise(exerciseRepository.save(item.getTrainingSessionExercise().getExercise()));
            item.setTrainingSessionExercise(trainingSessionExerciseRepository.save(item.getTrainingSessionExercise()));
            userProgressRepository.save(item);
        }
    }

    @PutMapping("/auth/trainingSessionExercises/put")
    public void updateTrainingSessionExercises(@RequestBody ArrayList<UserProgress> progress_mod) {
        for(UserProgress item: progress_mod){
            exerciseRepository.save(item.getTrainingSessionExercise().getExercise());
        }
    }

    @PutMapping("/auth/trainingSessionExercises/delete")
    public void deleteTrainingSessionExercises(@RequestBody ArrayList<UserProgress> progress_del) {
        for(UserProgress item: progress_del){
            userProgressRepository.delete(item);
            trainingSessionExerciseRepository.delete(item.getTrainingSessionExercise());
            exerciseRepository.delete(item.getTrainingSessionExercise().getExercise());
        }
    }
}
