package com.fitbook.backend.repository;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    @Query( "SELECT up FROM UserProgress up " +
            "WHERE up.trainingSessionExercise.trainingSession.trainingPlan.id = :trainingPlanId AND " +
            "up.user.login = :userLogin")
    List<UserProgress> getProgressByTrainingPlanIdAndUserLogin(
            @Param("trainingPlanId") Long trainingPlanId,
            @Param("userLogin") String userLogin
    );

    @Query( "SELECT up FROM UserProgress up " +
            "WHERE up.trainingSessionExercise.trainingSession.trainingPlan.id = :trainingPlanId")
    List<UserProgress> getProgressByTrainingPlanId(
            @Param("trainingPlanId") Long trainingPlanId
    );

    @Query( "SELECT up FROM UserProgress up " +
            "WHERE up.trainingSessionExercise.trainingSession.id = :trainingSessionId")
    List<UserProgress> getProgressByTrainingSessionId(
            @Param("trainingSessionId") Long trainingSessionId
    );

    @Query( "SELECT up FROM UserProgress up " +
            "WHERE up.user.login = :userLogin AND up.progress = 1")
    List<UserProgress> getDoneUserProgresses(
            @Param("userLogin") String userLogin
    );
}
