package com.fitbook.backend.repository;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserProgressRepository extends JpaRepository<TrainingPlan, Long> {
    @Query( "SELECT up FROM UserProgress up " +
            "WHERE up.trainingSessionExercise.trainingSession.trainingPlan.id = :trainingPlanId AND " +
            "up.user.login = :userLogin")
    List<UserProgress> getProgressByTrainingPlanIdAndUserLogin(
            @Param("trainingPlanId") Long trainingPlanId,
            @Param("userLogin") String userLogin
    );
}
