package com.fitbook.backend.repository;

import com.fitbook.backend.model.GroupMember;
import com.fitbook.backend.model.Post;
import com.fitbook.backend.model.SocialGroup;
import com.fitbook.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long>{
    @Query( "SELECT gm.socialGroup FROM GroupMember gm " +
            "WHERE gm.user.login LIKE :userLogin " +
            "ORDER BY gm.socialGroup.name DESC")
    List<SocialGroup> getSocialGroupsByUserLogin(
            @Param("userLogin") String userLogin
    );

    @Query( "SELECT gm.user FROM GroupMember gm " +
            "WHERE gm.socialGroup.id = :groupId ")
    List<User> getMembersByGroupId(
            @Param("groupId") Long groupId
    );
}
