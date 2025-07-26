package com.suza.promotion.services;

import com.suza.promotion.dto.AuthRequestDTO;
import com.suza.promotion.dto.AuthResponseDTO;
import com.suza.promotion.entity.User;
import com.suza.promotion.exception.AuthenticationException;
import com.suza.promotion.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponseDTO authenticate(AuthRequestDTO authRequest) {
        User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new AuthenticationException("Invalid credentials"));

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            throw new AuthenticationException("Invalid credentials");
        }

        AuthResponseDTO response = new AuthResponseDTO();
        response.setUserId(user.getId());
        response.setFullName(user.getFullName());
        response.setRole(user.getRole().name());
        return response;
    }
}