package com.fitbook.backend.repository;

import com.fitbook.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long>{
    @Query( "SELECT gm.socialGroup FROM GroupMember gm " +
            "WHERE gm.user.login LIKE :userLogin AND gm.status = 1" +
            "ORDER BY gm.socialGroup.name DESC")
    List<SocialGroup> getSocialGroupsByUserLogin(
            @Param("userLogin") String userLogin
    );

    @Query( "SELECT gm.user FROM GroupMember gm " +
            "WHERE gm.socialGroup.id = :groupId AND gm.status = 1")
    List<User> getMembersByGroupId(
            @Param("groupId") Long groupId
    );

    @Query( "SELECT sg FROM SocialGroup sg WHERE UPPER(sg.name) LIKE CONCAT('%', UPPER(:phrase), '%')")
    List<SocialGroup> searchSocialGroupByPhrase(
            @Param("phrase") String phrase
    );

    @Query( "SELECT gm FROM GroupMember gm " +
            "WHERE gm.user.login LIKE :login " +
            "AND gm.socialGroup.id = :groupId")
    GroupMember getGroupMemberByLoginAndGroupId(
            @Param("login") String login,
            @Param("groupId") Long groupId
    );
}
