package com.fitbook.backend.repository;

import com.fitbook.backend.model.TrainingDifficulty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingDifficultyRepository extends JpaRepository<TrainingDifficulty, Long> {
}
