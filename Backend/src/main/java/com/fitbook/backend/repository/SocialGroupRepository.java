package com.fitbook.backend.repository;

import com.fitbook.backend.model.SocialGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SocialGroupRepository extends JpaRepository<SocialGroup, Long> {

    @Query( "SELECT sg FROM SocialGroup sg " +
            "WHERE sg.id = :groupId ")
    SocialGroup getSocialGroupByGroupId(
            @Param("groupId") Long groupId
    );
}
