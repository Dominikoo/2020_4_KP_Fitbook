package com.fitbook.backend.controller;

import com.fitbook.backend.model.Post;
import com.fitbook.backend.model.SharedChartData;
import com.fitbook.backend.model.UserProgress;
import com.fitbook.backend.model.UserWeightHistory;
import com.fitbook.backend.repository.SharedChartDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SharedChartDataController {
    @Autowired
    SharedChartDataRepository sharedChartDataRepository;
    @Autowired
    UserProgressController userProgressController;

    @GetMapping("/auth/sharedChartData/get/byPostId/{postId}")
    public String getSharedChartDataByPostId(@PathVariable Long postId) {
        HashMap<String, Integer> doneExercisesPerDay = getDoneExercisesPerDay(postId);

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

    public void copyNumberOfFinishedExercisesForPost(Post post){
        HashMap<LocalDate, Integer> doneExercisesPerDay = userProgressController.getDoneExercisesPerLocalDate(post.getUser().getLogin());
        for(LocalDate key : doneExercisesPerDay.keySet()){
            sharedChartDataRepository.save(new SharedChartData(post, doneExercisesPerDay.get(key), key));
        }
    }

    public HashMap<String, Integer> getDoneExercisesPerDay(Long postId){
        HashMap<String, Integer> doneExercisesPerDay = new HashMap<>();
        for(SharedChartData sharedChartData : sharedChartDataRepository.getSharedChartDataByPostId(postId)){
            String key = "\"" + (sharedChartData.getDate().getDayOfMonth() < 10 ? "0" : "")
                    + sharedChartData.getDate().getDayOfMonth()
                    + "." + (sharedChartData.getDate().getMonthValue() < 10 ? "0" : "")
                    + sharedChartData.getDate().getMonthValue() + "\"";
            doneExercisesPerDay.put(key, sharedChartData.getValue());
        }
        return doneExercisesPerDay;
    }
}
