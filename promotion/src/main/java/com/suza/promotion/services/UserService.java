package com.suza.promotion.services;

import com.suza.promotion.dto.RegisterUserDTO;
import com.suza.promotion.dto.UserDTO;
import com.suza.promotion.dto.UserProfileDTO;
import com.suza.promotion.entity.User;
import com.suza.promotion.entity.User.Role;
import com.suza.promotion.exception.DuplicateEmailException;
import com.suza.promotion.exception.ResourceNotFoundException;
import com.suza.promotion.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO registerUser(RegisterUserDTO registerDTO) {
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new DuplicateEmailException("Email already exists");
        }

        User user = new User();
        user.setFullName(registerDTO.getFullName());
        user.setEmail(registerDTO.getEmail());

        String rawPassword = (registerDTO.getPassword() == null || registerDTO.getPassword().isBlank())
                ? "SUZAStaff001"
                : registerDTO.getPassword();

        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);

        user.setRole(Role.valueOf(registerDTO.getRole()));

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public UserProfileDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return convertToProfileDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        if (user.getDepartment() != null) {
            dto.setDepartmentName(user.getDepartment().getName());
        }
        if (user.getSchool() != null) {
            dto.setSchoolName(user.getSchool().getName());
        }
        return dto;
    }

    public Optional<UserDTO> findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::convertToDTO);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public List<UserDTO> findByRole(Role role) {
        return userRepository.findByRole(role).stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<UserDTO> findByDepartmentId(Long departmentId) {
        return userRepository.findByDepartmentId(departmentId).stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<UserDTO> findBySchoolId(Long schoolId) {
        return userRepository.findBySchoolId(schoolId).stream()
                .map(this::convertToDTO)
                .toList();
    }

    private UserProfileDTO convertToProfileDTO(User user) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        return dto;
    }
}