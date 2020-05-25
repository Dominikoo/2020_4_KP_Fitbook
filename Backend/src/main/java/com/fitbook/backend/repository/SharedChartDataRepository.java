package com.fitbook.backend.repository;

import com.fitbook.backend.model.SharedChartData;
import com.fitbook.backend.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SharedChartDataRepository extends JpaRepository<SharedChartData, Long> {
    @Query( "SELECT scd FROM SharedChartData scd " +
            "WHERE scd.post.id = :postId")
    List<SharedChartData> getSharedChartDataByPostId(
            @Param("postId") Long postId
    );
}
