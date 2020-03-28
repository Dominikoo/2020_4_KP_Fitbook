package com.fitbook.backend.repository;

import com.fitbook.backend.model.TrainingIntensity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingIntensityRepository extends JpaRepository<TrainingIntensity, Long> {
}
