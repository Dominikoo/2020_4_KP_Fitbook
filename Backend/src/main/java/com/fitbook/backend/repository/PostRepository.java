package com.fitbook.backend.repository;

import com.fitbook.backend.model.Post;
import com.fitbook.backend.model.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.*;

public interface PostRepository  extends JpaRepository<Post, Long> {

    @Query( "SELECT p FROM Post p " +
            "WHERE p.user.login LIKE :userLogin")
    List<Post> getPostsByUserLogin(
            @Param("userLogin") String userLogin
    );
}
