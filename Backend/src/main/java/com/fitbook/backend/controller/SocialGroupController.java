package com.fitbook.backend.controller;

import com.fitbook.backend.model.SocialGroup;
import com.fitbook.backend.repository.GroupMemberRepository;
import com.fitbook.backend.repository.SocialGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SocialGroupController {

    @Autowired
    private SocialGroupRepository socialGroupRepository;
    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @GetMapping("/auth/socialGroups/get/byUserLogin/{userLogin")
    private List<SocialGroup> getSocialGroupsByUserLogin(@PathVariable String userLogin){
        return groupMemberRepository.getSocialGroupsByUserLogin(userLogin);
    }
}
