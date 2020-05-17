package com.fitbook.backend.repository;

import com.fitbook.backend.model.PostComment;
import com.fitbook.backend.model.PostLike;
import com.fitbook.backend.model.UserConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    @Query( "SELECT pl FROM PostLike pl " +
            "WHERE pl.user.login LIKE :userLogin " +
            "AND pl.post.id = :postId")
    PostLike getPostLikeByLoginAndPostId(
            @Param("userLogin") String userLogin,
            @Param("postId") Long postId
    );

    @Query( "SELECT pl FROM PostLike pl " +
            "WHERE pl.post.id = :postId")
    List<PostLike> getPostLikesByPostId(
            @Param("postId") Long postId
    );
}
