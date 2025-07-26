package com.suza.promotion.controller;

import com.suza.promotion.dto.RegisterUserDTO;
import com.suza.promotion.dto.UserDTO;
import com.suza.promotion.dto.UserProfileDTO;
import com.suza.promotion.entity.User;
import com.suza.promotion.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register new user
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody RegisterUserDTO registerUserDTO) {
        UserDTO createdUser = userService.registerUser(registerUserDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // Get user profile by id
    @GetMapping("/{id}/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable("id") Long userId) {
        UserProfileDTO profile = userService.getUserProfile(userId);
        return ResponseEntity.ok(profile);
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Find user by email
    @GetMapping("/search")
    public ResponseEntity<UserDTO> findByEmail(@RequestParam("email") String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Check if email exists
    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsByEmail(@RequestParam("email") String email) {
        boolean exists = userService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }

    // Get users by role
    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserDTO>> findByRole(@PathVariable("role") String roleStr) {
        User.Role role;
        try {
            role = User.Role.valueOf(roleStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        List<UserDTO> users = userService.findByRole(role);
        return ResponseEntity.ok(users);
    }

    // Get users by department id
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<UserDTO>> findByDepartment(@PathVariable Long departmentId) {
        List<UserDTO> users = userService.findByDepartmentId(departmentId);
        return ResponseEntity.ok(users);
    }

    // Get users by school id
    @GetMapping("/school/{schoolId}")
    public ResponseEntity<List<UserDTO>> findBySchool(@PathVariable Long schoolId) {
        List<UserDTO> users = userService.findBySchoolId(schoolId);
        return ResponseEntity.ok(users);
    }
}
