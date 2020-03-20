package com.fitbook.backend.controller;

import com.fitbook.backend.model.User;
import com.fitbook.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public String getUsers(Pageable pageable){
        User user = userRepository.findById(1l).get();
        return user.getLogin();
    }
}
