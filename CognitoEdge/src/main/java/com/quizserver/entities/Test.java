package com.quizserver.entities;

import com.quizserver.dto.TestDTO;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Long time;

    @OneToMany(mappedBy ="test", cascade=CascadeType.ALL)
    private List<Question> questions;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    public TestDTO getDto() {
        TestDTO testDTO = new TestDTO();
        testDTO.setId(id);
        testDTO.setTitle(title);
        testDTO.setDescription(description);
        testDTO.setTime(time);
        testDTO.setDepartmentId(department != null ? department.getId() : null);
        testDTO.setDepartmentName(department != null ? department.getName() : ""); // ✅ Add this line
        return testDTO;
    }

}
