package com.fitbook.backend.repository;

import com.fitbook.backend.model.TrainingPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingPlanRepository extends JpaRepository<TrainingPlan, Long> {

    @Query("SELECT tp FROM TrainingPlan tp WHERE tp.trainingDifficulty.id IN :difficultyIds AND " +
            "tp.trainingIntensity.id IN :intensityIds AND tp.trainingLength.id IN :lengthIds AND " +
            "tp.trainingType.id IN :typeIds AND tp.isPrivate = FALSE")
    List<TrainingPlan> getPublicFilteredTrainingPlans(
            @Param("difficultyIds") List<Long> difficultyIds,
            @Param("intensityIds") List<Long> intensityIds,
            @Param("lengthIds") List<Long> lengthIds,
            @Param("typeIds") List<Long> typeIds
    );

    @Query( "SELECT DISTINCT up.trainingSessionExercise.trainingSession.trainingPlan FROM UserProgress up " +
            "WHERE up.trainingSessionExercise.trainingSession.trainingPlan.trainingDifficulty.id IN :difficultyIds AND " +
            "up.trainingSessionExercise.trainingSession.trainingPlan.trainingIntensity.id IN :intensityIds AND " +
            "up.trainingSessionExercise.trainingSession.trainingPlan.trainingLength.id IN :lengthIds AND " +
            "up.trainingSessionExercise.trainingSession.trainingPlan.trainingType.id IN :typeIds AND " +
            "up.user.login = :userLogin " +
            "AND up.trainingSessionExercise.trainingSession.trainingPlan.isPrivate = TRUE " +
            "AND up.trainingSessionExercise.trainingSession.trainingPlan.isVisible = TRUE")
    List<TrainingPlan> getFilteredTrainingPlansForUser(
            @Param("difficultyIds") List<Long> difficultyIds,
            @Param("intensityIds") List<Long> intensityIds,
            @Param("lengthIds") List<Long> lengthIds,
            @Param("typeIds") List<Long> typeIds,
            @Param("userLogin") String userLogin
    );

    @Query( "SELECT tp FROM TrainingPlan tp WHERE UPPER(tp.name) LIKE CONCAT('%', UPPER(:phrase), '%') AND tp.isPrivate = FALSE")
    List<TrainingPlan> searchTrainingPlansByPhrase(
            @Param("phrase") String phrase
    );
}
