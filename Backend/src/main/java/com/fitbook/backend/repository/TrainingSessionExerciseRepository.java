package com.fitbook.backend.repository;

import com.fitbook.backend.model.TrainingSession;
import com.fitbook.backend.model.TrainingSessionExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingSessionExerciseRepository extends JpaRepository<TrainingSessionExercise, Long> {

    @Query("SELECT tse FROM TrainingSessionExercise tse WHERE tse.trainingSession.id IN :trainingSessionId")
    List<TrainingSessionExercise> getTrainingSessionExercises(
            @Param("trainingSessionId") Long trainingSessionId
    );

}
