package com.quizserver.controller;

import com.quizserver.dto.UserDTO;
import com.quizserver.entities.User;
import com.quizserver.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody UserDTO userDto) {
        if (userService.hasUserWithEmail(userDto.getEmail())) {
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        try {
            User createdUser = userService.createUser(userDto);
            return new ResponseEntity<>(createdUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("User not created: " + e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User dbUser = userService.login(user);
        if (dbUser == null) {
            return new ResponseEntity<>("Wrong credentials", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(dbUser, HttpStatus.OK);
    }
}
