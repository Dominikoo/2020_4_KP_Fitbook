package com.fitbook.backend.controller;

import com.fitbook.backend.model.User;
import com.fitbook.backend.repository.UserRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/users")
    User postUser(@RequestBody User newUser) {
        try{
            return userRepository.save(newUser);
        }
        catch (Exception e){
            return null;
        }
    }

    @GetMapping("/users/id/{userId}")
    public User getUserById(@PathVariable Long userId){
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    @GetMapping("/users/login/{userLogin}")
    public User getUserByLogin(@PathVariable String userLogin){
        Optional<User> user = userRepository.findAll().stream().filter(u -> u.getLogin().equals(userLogin)).findFirst();
        return user.orElse(null);
    }

    @GetMapping("/users/email/{userEmail}")
    public User getUserByEmail(@PathVariable String userEmail){
        Optional<User> user = userRepository.findAll().stream().filter(u -> u.getEmail().equals(userEmail)).findFirst();
        return user.orElse(null);
    }

    @GetMapping("/users/existsLogin/{userLogin}")
    public Boolean getExistUserLogin(@PathVariable String userLogin){
        Optional<User> user = userRepository.findAll().stream().filter(u -> u.getLogin().equals(userLogin)).findFirst();
        return user.isPresent();
    }

    @GetMapping("/users/existsEmail/{userEmail}")
    public Boolean getExistUserEmail(@PathVariable String userEmail){
        Optional<User> user = userRepository.findAll().stream().filter(u -> u.getEmail().equals(userEmail)).findFirst();
        return user.isPresent();
    }
}
