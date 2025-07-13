package com.quizserver.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // One department can have many users
    @OneToMany(mappedBy = "department")
    @JsonIgnore
    private List<User> users;

    // One department can have many tests
    @OneToMany(mappedBy = "department")
    @JsonIgnore
    private List<Test> tests;
}
