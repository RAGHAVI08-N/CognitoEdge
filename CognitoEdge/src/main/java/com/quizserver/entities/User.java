package com.quizserver.entities;

import com.quizserver.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String name;

    private UserRole role;

    @ManyToOne(fetch = FetchType.EAGER)  // ✅ Force eager loading
    @JoinColumn(name = "department_id")
    private Department department;
}
