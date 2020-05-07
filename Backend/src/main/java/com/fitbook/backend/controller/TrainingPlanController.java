package com.fitbook.backend.controller;

import com.fitbook.backend.model.*;
import com.fitbook.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<TrainingPlan> getPublicFilteredTrainingPlans(@RequestBody HashMap<String, String> filterParameters){
        List<Long> difficultyParamsList = getParameters(filterParameters, "difficulty");
        List<Long> intensityParamsList = getParameters(filterParameters, "intensity");
        List<Long> lengthParamsList = getParameters(filterParameters, "length");
        List<Long> typeParamsList = getParameters(filterParameters, "type");
        return trainingPlanRepository.getPublicFilteredTrainingPlans(difficultyParamsList, intensityParamsList, lengthParamsList, typeParamsList);
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
                Exercise exercise = new Exercise("ćwiczenie 1", "ćwiczenie 1", 5, 10, 60);
                exercise = exerciseRepository.save(exercise);
                TrainingSessionExercise trainingSessionExercise = new TrainingSessionExercise(exercise, trainingSession, 1);
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

    @DeleteMapping("auth/trainingPlans/delete/{trainingPlanId}")
    public TrainingPlan deleteTrainingPlan(@PathVariable Long trainingPlanId){
        Optional<TrainingPlan> trainingPlan = trainingPlanRepository.findById(trainingPlanId);
        if(trainingPlan.isPresent()){
            List<TrainingSession> trainingSessions = trainingSessionRepository.getTrainingPlanSession(trainingPlanId);

            List<UserProgress> userProgresses = new ArrayList<>();
            trainingSessions.forEach(ts -> userProgresses.addAll(userProgressRepository.getProgressByTrainingSessionId(ts.getId())));
            userProgresses.forEach(up -> userProgressRepository.delete(up));
            List<TrainingSessionExercise> trainingSessionExercises = new ArrayList<>();
            trainingSessions.forEach(ts -> trainingSessionExercises.addAll(trainingSessionExerciseRepository.getTrainingSessionExercises(ts.getId())));
            trainingSessionExercises.forEach(tse -> {
                trainingSessionExerciseRepository.delete(tse);
                exerciseRepository.delete(tse.getExercise());
            });
            trainingSessions.forEach(ts -> trainingSessionRepository.delete(ts));
            trainingPlanRepository.delete(trainingPlan.get());
            return trainingPlan.get();
        }
        else{
            return null;
        }
    }

    @GetMapping("/auth/trainingPlans/add/{userLogin}/{trainingPlanId}")
    public TrainingPlan addTrainingPlanToUser(@PathVariable Long trainingPlanId, @PathVariable String userLogin){
        Optional<TrainingPlan> oldTrainingPlanOptional = trainingPlanRepository.findById(trainingPlanId);
        User user = userRepository.getUserByLogin(userLogin);
        if(oldTrainingPlanOptional.isPresent()){
            TrainingPlan oldTrainingPlan = oldTrainingPlanOptional.get();
            TrainingPlan newTrainingPlan = trainingPlanRepository.save(new TrainingPlan(oldTrainingPlan.getName(), oldTrainingPlan.getDescription(), oldTrainingPlan.getTrainingType(),
                    oldTrainingPlan.getTrainingLength(), oldTrainingPlan.getTrainingIntensity(), oldTrainingPlan.getTrainingDifficulty(), true));
            List<TrainingSession> oldTrainingSessions = trainingSessionRepository.getTrainingPlanSession(oldTrainingPlan.getId());
            for(TrainingSession ots : oldTrainingSessions){
                TrainingSession newTrainingSession = trainingSessionRepository.save(new TrainingSession(newTrainingPlan, ots.getName(), ots.getOrderNumber()));
                List<UserProgress> oldUserProgresses = userProgressRepository.getProgressByTrainingSessionId(ots.getId());
                for(UserProgress oup : oldUserProgresses){
                    Exercise oldExercise = oup.getTrainingSessionExercise().getExercise();
                    Exercise newExercise = exerciseRepository.save(new Exercise(oldExercise.getName(), oldExercise.getDescription(), oldExercise.getSets(), oldExercise.getReps(), oldExercise.getLengthInSecondsPerSet()));
                    TrainingSessionExercise newTrainingSessionExercise = trainingSessionExerciseRepository.save(new TrainingSessionExercise(newExercise, newTrainingSession, oup.getTrainingSessionExercise().getOrderNumber()));
                    userProgressRepository.save(new UserProgress(user, newTrainingSessionExercise, 0));
                }
            }
            return  newTrainingPlan;
        }
        else{
            return null;
        }
    }
}
