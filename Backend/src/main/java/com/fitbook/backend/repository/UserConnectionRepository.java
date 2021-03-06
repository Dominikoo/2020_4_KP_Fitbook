package com.fitbook.backend.repository;

import com.fitbook.backend.model.User;
import com.fitbook.backend.model.UserConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface UserConnectionRepository extends JpaRepository<UserConnection, Long> {
    @Query( "SELECT uc FROM UserConnection uc " +
            "WHERE uc.firstUser.login LIKE :login1 " +
            "AND uc.secondUser.login LIKE :login2")
    UserConnection getConnectionByLogins(
            @Param("login1") String login1,
            @Param("login2") String login2
    );

    @Query( "SELECT uc.secondUser FROM UserConnection uc " +
            "WHERE uc.firstUser.login LIKE :userLogin " +
            "AND uc.status = 1"
    )
    List<User> getFriendsByUserLogin(
            @Param("userLogin") String userLogin
    );

    @Query( "SELECT uc FROM UserConnection uc " +
            "WHERE uc.firstUser.login LIKE :userLogin " +
            "AND uc.status = 2"
    )
    List<UserConnection> getInvitationsByUserLogin(
            @Param("userLogin") String userLogin
    );

    @Query( "SELECT uc FROM UserConnection uc " +
            "WHERE uc.firstUser.login LIKE :userLogin " +
            "AND uc.status = 1"
    )
    List<UserConnection> getConnectionsByUserLogin(
            @Param("userLogin") String userLogin
    );
}
