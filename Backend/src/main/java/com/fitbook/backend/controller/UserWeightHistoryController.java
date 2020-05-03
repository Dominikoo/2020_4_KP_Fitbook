package com.fitbook.backend.controller;

import com.fitbook.backend.model.UserWeightHistory;
import com.fitbook.backend.repository.UserWeightHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserWeightHistoryController {
    @Autowired
    UserWeightHistoryRepository userWeightHistoryRepository;

    @PostMapping("/auth/userWeightHistory/post")
    public UserWeightHistory postUserWeightHistory(@RequestBody UserWeightHistory newUserWeightHistory){
        try{
            return userWeightHistoryRepository.save(newUserWeightHistory);
        }
        catch (Exception e){
            return null;
        }
    }

    @GetMapping("/auth/userWeightHistory/get/all/{userLogin}")
    public String getAllUserWeightHistory(@PathVariable String userLogin) {
        return "";
    }
}
