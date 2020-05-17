package com.fitbook.backend.controller;


import com.fitbook.backend.model.User;
import com.fitbook.backend.model.UserConnection;
import com.fitbook.backend.repository.UserConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserConnectionController {
    @Autowired
    private UserConnectionRepository userConnectionRepository;

    @PutMapping("/auth/userConnections")
    UserConnection putUserConnection(@RequestBody UserConnection modifiedUserConnection) {
        return userConnectionRepository.save(modifiedUserConnection);
    }
}
