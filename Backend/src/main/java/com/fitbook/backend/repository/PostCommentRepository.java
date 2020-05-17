package com.fitbook.backend.repository;

import com.fitbook.backend.model.PostComment;
import com.fitbook.backend.model.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
    @Query( "SELECT pc FROM PostComment pc " +
            "WHERE pc.post.id = :postId")
    List<PostComment> getPostCommentsByPostId(
            @Param("postId") Long postId
    );
}
