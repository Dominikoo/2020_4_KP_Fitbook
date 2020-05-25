package com.fitbook.backend.repository;

import com.fitbook.backend.model.SharedChartData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SharedChartDataRepository extends JpaRepository<SharedChartData, Long> {
}
