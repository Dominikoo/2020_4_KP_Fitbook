package com.fitbook.backend.controller;

import com.fitbook.backend.model.User;
import com.fitbook.backend.model.UserConnection;
import com.fitbook.backend.repository.UserConnectionRepository;
import com.fitbook.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SearchController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserConnectionRepository userConnectionRepository;

    @GetMapping("/auth/search/userConnections/{phrase}/{userLogin}")
    public List<UserConnection> searchUserConnections(@PathVariable String phrase, @PathVariable String userLogin){
        User user = userRepository.getUserByLogin(userLogin);
        List<User> foundUsers = userRepository.searchUsersByPhrase(phrase);
        List<UserConnection> userConnections = new ArrayList<UserConnection>();
        for(User foundUser : foundUsers){
            UserConnection userConnection = userConnectionRepository.getConnectionByLogins(user.getLogin(), foundUser.getLogin());
            userConnections.add(Objects.requireNonNullElseGet(userConnection, () -> new UserConnection(user, foundUser, 0)));
        }
        return userConnections;
    }
}
