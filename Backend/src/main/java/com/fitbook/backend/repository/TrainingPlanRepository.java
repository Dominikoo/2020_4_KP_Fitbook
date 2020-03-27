package com.fitbook.backend.repository;

import com.fitbook.backend.model.TrainingPlan;
import com.fitbook.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingPlanRepository extends JpaRepository<TrainingPlan, Long> {

    @Query("SELECT tp FROM TrainingPlan tp WHERE tp.trainingDifficulty.id IN :difficultyIds AND " +
            "tp.trainingIntensity.id IN :intensityIds AND tp.trainingLength.id IN :lengthIds AND " +
            "tp.trainingType.id IN :typeIds")
    List<TrainingPlan> getFilteredTrainingPlans(
            @Param("difficultyIds") List<Long> difficultyIds,
            @Param("intensityIds") List<Long> intensityIds,
            @Param("lengthIds") List<Long> lengthIds,
            @Param("typeIds") List<Long> typeIds
    );
}
