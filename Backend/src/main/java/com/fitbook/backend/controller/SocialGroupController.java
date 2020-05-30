package com.fitbook.backend.controller;

import com.fitbook.backend.model.GroupMember;
import com.fitbook.backend.model.SocialGroup;
import com.fitbook.backend.model.User;
import com.fitbook.backend.repository.GroupMemberRepository;
import com.fitbook.backend.repository.SocialGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SocialGroupController {

    @Autowired
    private SocialGroupRepository socialGroupRepository;
    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @PostMapping("/auth/socialGroups/post")
    public SocialGroup postSocialGroup(@RequestBody SocialGroup socialGroup){
        try{
            SocialGroup savedSocialGroup = socialGroupRepository.save(socialGroup);
            groupMemberRepository.save(new GroupMember(savedSocialGroup.getOwner(), savedSocialGroup, 1));
            return savedSocialGroup;
        }
        catch (Exception e){
            return null;
        }
    }

    @GetMapping("/auth/socialGroups/get/byUserLogin/{userLogin}")
    public List<SocialGroup> getSocialGroupsByUserLogin(@PathVariable String userLogin){
        return groupMemberRepository.getSocialGroupsByUserLogin(userLogin);
    }

    @GetMapping("/auth/socialGroups/get/byId/{groupId}")
    public SocialGroup getSocialGroupById(@PathVariable Long groupId){
        return socialGroupRepository.findById(groupId).orElse(null);
    }

    @GetMapping("/auth/socialGroups/getMembers/byId/{groupId}")
    public List<User> getMembersByGroupId(@PathVariable Long groupId){
        return groupMemberRepository.getMembersByGroupId(groupId);
    }

    @GetMapping("/auth/socialGroups/getPendingMembers/byId/{groupId}")
    public List<User> getPendingMembersByGroupId(@PathVariable Long groupId){
        return groupMemberRepository.getPendingMembersByGroupId(groupId);
    }
}
