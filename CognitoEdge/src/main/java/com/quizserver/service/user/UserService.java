package com.quizserver.service.user;

import com.quizserver.dto.UserDTO;
import com.quizserver.entities.User;

public interface UserService {
    Boolean hasUserWithEmail(String email);
    User createUser(UserDTO userDto);
    User login(User user);
}
