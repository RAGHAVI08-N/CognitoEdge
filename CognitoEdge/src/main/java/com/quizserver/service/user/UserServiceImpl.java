package com.quizserver.service.user;

import com.quizserver.dto.UserDTO;
import com.quizserver.entities.Department;
import com.quizserver.entities.User;
import com.quizserver.enums.UserRole;
import com.quizserver.repository.DepartmentRepository;
import com.quizserver.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @PostConstruct
    private void createAdminUser() {
        User optionalUser = userRepository.findByRole(UserRole.ADMIN);
        if (optionalUser == null) {
            User user = new User();
            user.setName("Admin");
            user.setEmail("admin@gmail.com");
            user.setPassword("admin");
            user.setRole(UserRole.ADMIN);
            userRepository.save(user);
        }
    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email) != null;
    }

    @Override
    public User createUser(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

        if (dto.getRole() == UserRole.ADMIN) {
            user.setRole(UserRole.ADMIN);
            user.setDepartment(null); // ✅ Admin has no department
        } else {
            user.setRole(UserRole.USER);
            Department department = departmentRepository.findByName(dto.getDepartmentName())
                    .orElseThrow(() -> new EntityNotFoundException("Department not found with name: " + dto.getDepartmentName()));
            user.setDepartment(department);
        }

        return userRepository.save(user);
    }


    @Override
    public User login(User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if (optionalUser.isPresent() && user.getPassword().equals(optionalUser.get().getPassword())) {
            return optionalUser.get();
        }
        return null;
    }
}
