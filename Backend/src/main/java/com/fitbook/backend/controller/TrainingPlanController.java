package com.fitbook.backend.controller;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.User;
import com.fitbook.backend.repository.TrainingPlanRepository;
import com.fitbook.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TrainingPlanController {

    private final static String SEPARATOR = ",";
    @Autowired
    private TrainingPlanRepository trainingPlanRepository;

    @GetMapping("/auth/trainingPlans/all")
    public List<TrainingPlan> getTrainingPlans(){
        return trainingPlanRepository.findAll();
    }

    @GetMapping("/auth/trainingPlans/filtered")
    public List<TrainingPlan> getFilteredTrainingPlans(@RequestBody HashMap<String, String> filterParameters){
        List<Long> difficultyParamsList = getParameters(filterParameters, "difficulty");
        List<Long> intensityParamsList = getParameters(filterParameters, "intensity");
        List<Long> lengthParamsList = getParameters(filterParameters, "length");
        List<Long> typeParamsList = getParameters(filterParameters, "type");
        return trainingPlanRepository.getFilteredTrainingPlans(difficultyParamsList, intensityParamsList, lengthParamsList, typeParamsList);
    }

    private List<Long> getParameters(HashMap<String, String> filterParameters, String key){
        return Arrays.stream(filterParameters.get(key).split(SEPARATOR))
                .flatMapToLong(p -> LongStream.of(Long.parseLong(p))).boxed().collect(Collectors.toList());
    }
}
