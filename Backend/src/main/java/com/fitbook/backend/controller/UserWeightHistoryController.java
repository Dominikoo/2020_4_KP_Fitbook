package com.fitbook.backend.controller;

import com.fitbook.backend.model.Post;
import com.fitbook.backend.model.User;
import com.fitbook.backend.model.UserWeightHistory;
import com.fitbook.backend.repository.UserRepository;
import com.fitbook.backend.repository.UserWeightHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserWeightHistoryController {
    @Autowired
    UserWeightHistoryRepository userWeightHistoryRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/auth/userWeightHistory/post/{userLogin}")
    public UserWeightHistory postUserWeightHistory(@RequestBody UserWeightHistory newUserWeightHistory, @PathVariable String userLogin){
        newUserWeightHistory.setUser(userRepository.getUserByLogin(userLogin));
        try{
            UserWeightHistory oldUserWeightHistory = userWeightHistoryRepository.getUserWeightHistoryByUserAndDate(userLogin, newUserWeightHistory.getDate());
            if(oldUserWeightHistory == null) {
                return userWeightHistoryRepository.save(newUserWeightHistory);
            }
            else{
                oldUserWeightHistory.setWeight(newUserWeightHistory.getWeight());
                return userWeightHistoryRepository.save(oldUserWeightHistory);
            }
        }
        catch (Exception e){
            return null;
        }
    }

    @GetMapping("/auth/userWeightHistory/get/all/{userLogin}")
    public String getAllUserWeightHistory(@PathVariable String userLogin) {
        return userWeightToJSON(userWeightHistoryRepository.getUserWeightHistory(userLogin));
    }

    @GetMapping("/auth/userWeightHistory/get/exists/{userLogin}/{date}")
    public Boolean existUserWeightHistory(@PathVariable String userLogin, @PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date){
        return userWeightHistoryRepository.getUserWeightHistoryByUserAndDate(userLogin, date) != null;
    }

    @GetMapping("/auth/userWeightHistory/get/byPostId/{postId}")
    public String getUserWeightHistoryByPostId(@PathVariable Long postId) {
        return userWeightToJSON(userWeightHistoryRepository.getUserWeightsByPostId(postId));
    }

    public void copyWeightForPost(Post post){
        List<UserWeightHistory> userWeightHistoryToCopy = userWeightHistoryRepository.getUserWeightHistory(post.getUser().getLogin());
        for(UserWeightHistory uwh : userWeightHistoryToCopy){
            userWeightHistoryRepository.save(new UserWeightHistory(uwh.getUser(), uwh.getWeight(), uwh.getDate(), post));
        }
    }

    public String userWeightToJSON(List<UserWeightHistory> userWeightHistoryList){
        LocalDate firstDay = userWeightHistoryList.stream().map(UserWeightHistory::getDate).max(LocalDate::compareTo).get();
        LocalDate lastDay = userWeightHistoryList.stream().map(UserWeightHistory::getDate).min(LocalDate::compareTo).get();
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("[\n{\n\"name\": \"").append("waga").append("\",\n\"series\": [");
        for(UserWeightHistory userWeight : userWeightHistoryList){
            String day = "\"" + (userWeight.getDate().getDayOfMonth() < 10 ? "0" : "") + userWeight.getDate().getDayOfMonth()
                    + "." + (userWeight.getDate().getMonthValue() < 10 ? "0" : "") + userWeight.getDate().getMonthValue() + "\"";
            jsonBuilder.append("\n{\n\"name\": ").append(day).append(",\n");
            jsonBuilder.append("\"value\": ").append(userWeight.getWeight()).append("\n}");
            jsonBuilder.append(",");
        }
        jsonBuilder.replace(jsonBuilder.length() - 1, jsonBuilder.length(), "");
        jsonBuilder.append("\n]\n}\n]");
        return jsonBuilder.toString();
    }
}
