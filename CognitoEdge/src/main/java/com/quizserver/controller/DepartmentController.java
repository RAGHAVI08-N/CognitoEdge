package com.quizserver.controller;

import com.quizserver.entities.Department;
import com.quizserver.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/departments")
@CrossOrigin("*")
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    @PostMapping
    public ResponseEntity<?> addDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(departmentRepository.save(department));
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable Long id) {
        departmentRepository.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
