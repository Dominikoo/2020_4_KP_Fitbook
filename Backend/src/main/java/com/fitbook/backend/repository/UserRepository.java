package com.fitbook.backend.repository;

import com.fitbook.backend.model.User;
import com.fitbook.backend.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query( "SELECT u FROM User u " +
            "WHERE u.login = :userLogin")
    User getUserByLogin(
            @Param("userLogin") String userLogin
    );

    @Query( "SELECT u FROM User u " +
            "WHERE UPPER(u.login) like CONCAT('%', UPPER(:phrase), '%') " +
            "OR UPPER(u.firstName) like CONCAT('%', UPPER(:phrase), '%') " +
            "OR UPPER(u.lastName) like CONCAT('%', UPPER(:phrase), '%')")
    List<User> searchUsersByPhrase(
            @Param("phrase") String phrase
    );
}
