package com.quizserver.dto;

import com.quizserver.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String name;
    private UserRole role;

    // Accept department name instead of ID during registration
    private String departmentName;
}
