package com.fitbook.backend.controller;

import com.fitbook.backend.model.*;
import com.fitbook.backend.repository.*;
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
    @Autowired
    private TrainingPlanRepository trainingPlanRepository;
    @Autowired
    private SocialGroupRepository socialGroupRepository;
    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @GetMapping("/auth/search/userConnections/{phrase}/{userLogin}")
    public List<UserConnection> searchUserConnections(@PathVariable String phrase, @PathVariable String userLogin){
        User user = userRepository.getUserByLogin(userLogin);
        List<User> foundUsers = userRepository.searchUsersByPhrase(phrase);
        List<UserConnection> userConnections = new ArrayList<UserConnection>();
        for(User foundUser : foundUsers){
            UserConnection userConnection = userConnectionRepository.getConnectionByLogins(user.getLogin(), foundUser.getLogin());
            userConnections.add(Objects.requireNonNullElseGet(userConnection, () -> new UserConnection(user, foundUser, user.getLogin().equals(foundUser.getLogin()) ? -1 : 0)));
        }
        return userConnections;
    }

    @GetMapping("/auth/search/trainingPlans/{phrase}")
    public List<TrainingPlan> searchTrainingPlans(@PathVariable String phrase){
        return phrase.equals("") ? new ArrayList<>() : trainingPlanRepository.searchTrainingPlansByPhrase(phrase);
    }

    @GetMapping("/auth/search/socialGroups/{phrase}/{userLogin}")
    public List<GroupMember> searchSocialGroups(@PathVariable String phrase, @PathVariable String userLogin){
        User user = userRepository.getUserByLogin(userLogin);
        if(user != null){
            List<SocialGroup> foundSocialGroups = socialGroupRepository.searchSocialGroupByPhrase(phrase);
            List<GroupMember> groupMembers = new ArrayList<>();
            for(SocialGroup socialGroup : foundSocialGroups){
                GroupMember groupMember = groupMemberRepository.getGroupMemberByLoginAndGroupId(userLogin, socialGroup.getId());
                groupMembers.add(Objects.requireNonNullElseGet(groupMember, () -> new GroupMember(user, socialGroup, 0)));
            }
            return groupMembers;
        }
        else {
            return null;
        }
    }
}
