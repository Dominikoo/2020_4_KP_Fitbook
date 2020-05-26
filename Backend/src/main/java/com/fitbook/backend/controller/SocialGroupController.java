package com.fitbook.backend.controller;

import com.fitbook.backend.repository.SocialGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SocialGroupController {

    @Autowired
    private SocialGroupRepository socialGroupRepository;
}
