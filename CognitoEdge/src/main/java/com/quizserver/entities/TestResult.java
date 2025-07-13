package com.quizserver.entities;


import com.quizserver.dto.TestResultDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalQuestions;
    private int correctAnswers;
    private double percentage;

    @ManyToOne
    @JoinColumn(name="test_id")
    private Test test;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public TestResultDTO getDto() {
        TestResultDTO dto = new TestResultDTO();
        dto.setId(id);
        dto.setTotalQuestions(totalQuestions);
        dto.setCorrectAnswers(correctAnswers);
        dto.setPercentage(percentage);
        dto.setTestName(test.getTitle());
        dto.setUserName(user.getName());

        String deptName = (test.getDepartment() != null)
                ? test.getDepartment().getName()
                : "N/A";
        System.out.println("DEBUG: TestResult #" + id + " deptName=" + deptName);
        dto.setDepartmentName(deptName);

        return dto;
    }

}

