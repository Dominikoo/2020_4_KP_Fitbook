package com.fitbook.backend.controller;

import com.fitbook.backend.model.GroupMember;
import com.fitbook.backend.model.UserConnection;
import com.fitbook.backend.repository.GroupMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class GroupMemberController {

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @PutMapping("/auth/groupMember")
    GroupMember putGroupMember(@RequestBody GroupMember modifiedGroupMember) {
        GroupMember groupMember = groupMemberRepository.getGroupMemberByLoginAndGroupId(
                modifiedGroupMember.getUser().getLogin(), modifiedGroupMember.getSocialGroup().getId());
        if(groupMember != null){
            if(modifiedGroupMember.getStatus() != null) groupMember.setStatus(modifiedGroupMember.getStatus());
            return groupMemberRepository.save(groupMember);
        }
        else{
            return groupMemberRepository.save(modifiedGroupMember);
        }
    }
}
