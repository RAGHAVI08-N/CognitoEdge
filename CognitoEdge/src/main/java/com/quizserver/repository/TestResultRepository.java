package com.quizserver.repository;

import com.quizserver.entities.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {

    List<TestResult> findAllByUserId(Long userId);  // Optional: used elsewhere
    List<TestResult> findByUserId(Long userId);      // ✅ Needed for attempted test IDs
    boolean existsByUserIdAndTestId(Long userId, Long testId);
}
