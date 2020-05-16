package com.fitbook.backend.controller;

import com.fitbook.backend.model.User;
import com.fitbook.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SearchController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/auth/search/users/{phrase}")
    public List<User> searchUsers(@PathVariable String phrase){
        return userRepository.searchUsersByPhrase(phrase);
    }
}
