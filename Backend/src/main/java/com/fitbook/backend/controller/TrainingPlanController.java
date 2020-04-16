package com.fitbook.backend.controller;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.TrainingSession;
import com.fitbook.backend.model.TrainingSessionExercise;
import com.fitbook.backend.model.UserProgress;
import com.fitbook.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.LongStream;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TrainingPlanController {

    private final static String SEPARATOR = ",";

    @Autowired
    private TrainingPlanRepository trainingPlanRepository;
    @Autowired
    private TrainingSessionRepository trainingSessionRepository;
    @Autowired
    private TrainingSessionExerciseRepository trainingSessionExerciseRepository;
    @Autowired
    private UserProgressRepository userProgressRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;

    @GetMapping("/auth/trainingPlans/all")
    public List<TrainingPlan> getTrainingPlans(){
        return trainingPlanRepository.findAll();
    }

    @PostMapping("/auth/trainingPlans/filtered")
    public List<TrainingPlan> getFilteredTrainingPlans(@RequestBody HashMap<String, String> filterParameters){
        List<Long> difficultyParamsList = getParameters(filterParameters, "difficulty");
        List<Long> intensityParamsList = getParameters(filterParameters, "intensity");
        List<Long> lengthParamsList = getParameters(filterParameters, "length");
        List<Long> typeParamsList = getParameters(filterParameters, "type");
        return trainingPlanRepository.getFilteredTrainingPlans(difficultyParamsList, intensityParamsList, lengthParamsList, typeParamsList);
    }

    @PostMapping("/auth/trainingPlans/filtered/{userLogin}/{progress}")
    public List<TrainingPlan> getFilteredTrainingPlansForUser(@RequestBody HashMap<String, String> filterParameters, @PathVariable String userLogin, @PathVariable Integer progress){
        List<Long> difficultyParamsList = getParameters(filterParameters, "difficulty");
        List<Long> intensityParamsList = getParameters(filterParameters, "intensity");
        List<Long> lengthParamsList = getParameters(filterParameters, "length");
        List<Long> typeParamsList = getParameters(filterParameters, "type");
        List<TrainingPlan> trainingPlans =  trainingPlanRepository.getFilteredTrainingPlansForUser(difficultyParamsList, intensityParamsList, lengthParamsList, typeParamsList, userLogin);
        List<TrainingPlan> trainingPlansWithCorrectProgress = new ArrayList<>();
        for(TrainingPlan trainingPlan : trainingPlans){
            if(userProgressRepository.getProgressByTrainingPlanIdAndUserLogin(trainingPlan.getId(), userLogin).stream()
                    .flatMapToInt(up -> IntStream.of(up.getProgress())).min().getAsInt() == progress)
                trainingPlansWithCorrectProgress.add(trainingPlan);
        }
        return trainingPlansWithCorrectProgress;
    }

    private List<Long> getParameters(HashMap<String, String> filterParameters, String key){
        return Arrays.stream(filterParameters.get(key).toString().split(SEPARATOR))
                .flatMapToLong(p -> LongStream.of(Long.parseLong(p))).boxed().collect(Collectors.toList());
    }

    @PostMapping("/auth/trainingPlans/post/{userLogin}")
    public TrainingPlan postTrainingPlan(@RequestBody TrainingPlan trainingPlan, @PathVariable String userLogin){
        try{
            trainingPlanRepository.save(trainingPlan);
            Optional<TrainingPlan> trainingPlanOptional = trainingPlanRepository.findById(trainingPlan.getId());
            if(trainingPlanOptional.isPresent()){
                TrainingSession trainingSession = new TrainingSession(trainingPlanOptional.get(), "Dzień 1", 1);
                TrainingSessionExercise trainingSessionExercise = new TrainingSessionExercise(exerciseRepository.findAll().get(0), trainingSession, 1);
                UserProgress userProgress = new UserProgress(userRepository.getUserByLogin(userLogin), trainingSessionExercise, 0);
                trainingSessionRepository.save(trainingSession);
                trainingSessionExerciseRepository.save(trainingSessionExercise);
                userProgressRepository.save(userProgress);
                return trainingPlanOptional.get();
            }
            return null;
        }
        catch (Exception e){
            return null;
        }
    }
}
