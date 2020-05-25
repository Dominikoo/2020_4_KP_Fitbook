package com.fitbook.backend.controller;

import com.fitbook.backend.model.Post;
import com.fitbook.backend.model.SharedChartData;
import com.fitbook.backend.model.UserWeightHistory;
import com.fitbook.backend.repository.SharedChartDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SharedChartDataController {
    @Autowired
    SharedChartDataRepository sharedChartDataRepository;
    @Autowired
    UserProgressController userProgressController;

    public void copyNumberOfFinishedExercisesForPost(Post post){
        HashMap<LocalDate, Integer> doneExercisesPerDay = userProgressController.getDoneExercisesPerLocalDate(post.getUser().getLogin());
        for(LocalDate key : doneExercisesPerDay.keySet()){
            sharedChartDataRepository.save(new SharedChartData(post, doneExercisesPerDay.get(key), key));
        }
    }
}
