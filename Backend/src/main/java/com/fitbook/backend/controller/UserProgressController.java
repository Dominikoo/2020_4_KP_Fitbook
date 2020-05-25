package com.fitbook.backend.controller;

import com.fitbook.backend.model.TrainingSessionExercise;
import com.fitbook.backend.model.UserProgress;
import com.fitbook.backend.repository.TrainingSessionExerciseRepository;
import com.fitbook.backend.repository.UserProgressRepository;
import org.hibernate.validator.internal.util.privilegedactions.LoadClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDate;
import java.util.*;

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
        userProgress.setLastModification(LocalDate.now());
        userProgressRepository.save(userProgress);
        return userProgress;
    }

    @GetMapping("/auth/userProgress/get/summary/{userLogin}")
    public String getUserProgressSummary(@PathVariable String userLogin){
        HashMap<String, Integer> doneExercisesPerDay = getDoneExercisesPerDay(userLogin);

        List<String> days = new ArrayList<>(doneExercisesPerDay.keySet());
        LocalDate localDate = LocalDate.now();
        while (days.size() < 14){
            String day = "\"" + (localDate.getDayOfMonth() < 10 ? "0" : "") + localDate.getDayOfMonth()
                    + "." + (localDate.getMonthValue() < 10 ? "0" : "") + localDate.getMonthValue() + "\"";
            if( ! days.contains(day)){
                days.add(day);
            }
            localDate = localDate.minusDays(1);
        }
        days.sort((o1, o2) -> {
            if (o1.substring(4, 6).equals(o2.substring(4, 6)))
                return o1.substring(1, 3).compareTo(o2.substring(1, 3));
            else
                return o1.substring(4, 6).compareTo(o2.substring(4, 6));
        });
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("[");
        for(String day : days){
            jsonBuilder.append("\n{\n\"name\": ").append(day).append(",\n");
            jsonBuilder.append("\"value\": ").append(doneExercisesPerDay.getOrDefault(day, 0)).append("\n}");
            jsonBuilder.append(",");
        }
        jsonBuilder.replace(jsonBuilder.length() - 1, jsonBuilder.length(), "");
        jsonBuilder.append("\n]");
        return jsonBuilder.toString();
    }

    public HashMap<String, Integer> getDoneExercisesPerDay(String userLogin){
        HashMap<String, Integer> doneExercisesPerDay = new HashMap<>();
        for(UserProgress progress : userProgressRepository.getDoneUserProgresses(userLogin)){
            String key = "\"" + (progress.getLastModification().getDayOfMonth() < 10 ? "0" : "")
                    + progress.getLastModification().getDayOfMonth()
                    + "." + (progress.getLastModification().getMonthValue() < 10 ? "0" : "")
                    + progress.getLastModification().getMonthValue() + "\"";
            if(doneExercisesPerDay.containsKey(key)){
                doneExercisesPerDay.replace(key, doneExercisesPerDay.get(key) + 1);
            }
            else{
                doneExercisesPerDay.put(key, progress.getProgress());
            }
        }
        return doneExercisesPerDay;
    }

    public HashMap<LocalDate, Integer> getDoneExercisesPerLocalDate(String userLogin){
        HashMap<LocalDate, Integer> doneExercisesPerDay = new HashMap<>();
        for(UserProgress progress : userProgressRepository.getDoneUserProgresses(userLogin)){
            if(doneExercisesPerDay.containsKey(progress.getLastModification())){
                doneExercisesPerDay.replace(progress.getLastModification(), doneExercisesPerDay.get(progress.getLastModification()) + 1);
            }
            else{
                doneExercisesPerDay.put(progress.getLastModification(), progress.getProgress());
            }
        }
        return doneExercisesPerDay;
    }
}
