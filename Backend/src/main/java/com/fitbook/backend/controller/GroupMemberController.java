package com.fitbook.backend.controller;

import com.fitbook.backend.model.GroupMember;
import com.fitbook.backend.model.UserConnection;
import com.fitbook.backend.repository.GroupMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.desktop.OpenFilesEvent;
import java.util.Optional;

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

    @DeleteMapping("/auth/groupMember/delete/{groupMemberId}")
    public GroupMember deleteGroupMember(@PathVariable Long groupMemberId) {
        Optional<GroupMember> groupMember = groupMemberRepository.findById(groupMemberId);
        if(groupMember.isPresent()){
            groupMemberRepository.delete(groupMember.get());
            return groupMember.get();
        }
        return null;
    }
}
