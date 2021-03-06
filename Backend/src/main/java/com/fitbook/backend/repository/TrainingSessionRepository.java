package com.fitbook.backend.repository;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.TrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingSessionRepository extends JpaRepository<TrainingSession, Long> {

    @Query("SELECT ts FROM TrainingSession ts WHERE ts.trainingPlan.id IN :trainingPlanId")
    List<TrainingSession> getTrainingPlanSession(
            @Param("trainingPlanId") Long trainingPlanId
    );

    @Query("SELECT ts FROM TrainingSession ts WHERE ts.trainingPlan.id = :trainingPlanId  " +
            "AND ts.orderNumber = :orderNumber AND ts.name = :name")
    TrainingSession getTrainingSession(
            @Param("trainingPlanId") Long trainingPlanId,
            @Param("orderNumber") Integer orderNumber,
            @Param("name") String name
    );

}
