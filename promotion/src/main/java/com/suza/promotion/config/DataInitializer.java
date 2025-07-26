package com.suza.promotion.config;

import com.suza.promotion.entity.Department;
import com.suza.promotion.entity.School;
import com.suza.promotion.entity.User;
import com.suza.promotion.repository.DepartmentRepository;
import com.suza.promotion.repository.SchoolRepository;
import com.suza.promotion.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class DataInitializer {

    private final UserRepository userRepository;
    private final SchoolRepository schoolRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           SchoolRepository schoolRepository,
                           DepartmentRepository departmentRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.schoolRepository = schoolRepository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void initData() {
        if (userRepository.count() > 0) return;

        AtomicInteger idCounter = new AtomicInteger(1001);

        // 1. Create users for each role
        User dean = createUser("Dean User", "dean@suza.ac.tz", User.Role.DEAN, "Dean", idCounter.getAndIncrement());
        User hod = createUser("HOD User", "hod@suza.ac.tz", User.Role.HOD, "Senior Lecturer", idCounter.getAndIncrement());
        User dvc = createUser("DVC User", "dvc@suza.ac.tz", User.Role.DVC, "Professor", idCounter.getAndIncrement());
        User hr = createUser("HR User", "hr@suza.ac.tz", User.Role.HR, "Officer", idCounter.getAndIncrement());
        User admin = createUser("Admin User", "admin@suza.ac.tz", User.Role.ADMIN, "Admin", idCounter.getAndIncrement());
        User staff = createUser("Staff User", "staff@suza.ac.tz", User.Role.ACADEMIC, "Assistant Lecturer", idCounter.getAndIncrement());

        userRepository.saveAll(List.of(dean, hod, dvc, hr, admin, staff));

        // 2. Create School
        School school = new School();
        school.setName("School of Science");
        school.setCode("SCI");
        school.setDescription("Faculty of Science and Technology");
        school.setDean(dean);
        schoolRepository.save(school);

        // 3. Create Department
        Department department = new Department();
        department.setName("Department of Computer Science");
        department.setCode("CS");
        department.setDescription("Department of Computer Science and IT");
        department.setHeadOfDepartment(hod);
        department.setSchool(school);
        departmentRepository.save(department);

        // 4. Assign School and Department to users
        dean.setSchool(school);

        hod.setSchool(school);
        hod.setDepartment(department);

        staff.setSchool(school);
        staff.setDepartment(department);

        userRepository.saveAll(List.of(dean, hod, staff));

        System.out.println("Data initialized with demo users, school, and department.");
    }

    private User createUser(String name, String email, User.Role role, String rank, int idNumber) {
        User user = new User();
        user.setFullName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode("SUZAStaff001"));
        user.setRole(role);
        user.setIsActive(true);
        user.setCurrentRank(rank);
        user.setEmployeeId("SUZA" + idNumber);
        user.setPhoneNumber("25571" + String.format("%06d", idNumber));
        return user;
    }
}