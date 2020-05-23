package com.fitbook.backend.repository;

import com.fitbook.backend.model.Exercise;
import com.fitbook.backend.model.UserProgress;
import com.fitbook.backend.model.UserWeightHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface UserWeightHistoryRepository extends JpaRepository<UserWeightHistory, Long> {
    @Query( "SELECT uwh FROM UserWeightHistory uwh " +
            "WHERE uwh.user.login = :userLogin AND uwh.post = NULL " +
            "ORDER BY uwh.date ASC")
    List<UserWeightHistory> getUserWeightHistory(
            @Param("userLogin") String userLogin
    );

    @Query( "SELECT uwh FROM UserWeightHistory uwh " +
            "WHERE uwh.user.login = :userLogin AND uwh.date = :date AND uwh.post = NULL")
    UserWeightHistory getUserWeightHistoryByUserAndDate(
            @Param("userLogin") String userLogin,
            @Param("date") LocalDate date
            );

    @Query( "SELECT uwh FROM UserWeightHistory uwh " +
            "WHERE uwh.post.id = :postId")
    List<UserWeightHistory> getUserWeightsByPostId(
            @Param("postId") Long postId
    );
}
