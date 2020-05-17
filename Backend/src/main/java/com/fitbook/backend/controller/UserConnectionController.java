package com.fitbook.backend.controller;


import com.fitbook.backend.model.User;
import com.fitbook.backend.model.UserConnection;
import com.fitbook.backend.repository.UserConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserConnectionController {
    @Autowired
    private UserConnectionRepository userConnectionRepository;

    @PutMapping("/auth/userConnections")
    UserConnection putUserConnection(@RequestBody UserConnection modifiedUserConnection) {
        modifiedUserConnection = userConnectionRepository.save(modifiedUserConnection);
        UserConnection secondConnection = userConnectionRepository.getConnectionByLogins(
                modifiedUserConnection.getSecondUser().getLogin(), modifiedUserConnection.getFirstUser().getLogin());
        switch (modifiedUserConnection.getStatus()){
            case 0:
                if(secondConnection != null) secondConnection.setStatus(0);
                else secondConnection = new UserConnection(modifiedUserConnection.getSecondUser(), modifiedUserConnection.getFirstUser(), 0);
                break;
            case 1:
                if(secondConnection != null) secondConnection.setStatus(1);
                else secondConnection = new UserConnection(modifiedUserConnection.getSecondUser(), modifiedUserConnection.getFirstUser(), 1);
                break;
            case 2:
                if(secondConnection != null) secondConnection.setStatus(3);
                else secondConnection = new UserConnection(modifiedUserConnection.getSecondUser(), modifiedUserConnection.getFirstUser(), 3);
                break;
            case 3:
                if(secondConnection != null) secondConnection.setStatus(2);
                else secondConnection = new UserConnection(modifiedUserConnection.getSecondUser(), modifiedUserConnection.getFirstUser(), 2);
                break;
        }
        userConnectionRepository.save(secondConnection);
        return modifiedUserConnection;
    }
}
