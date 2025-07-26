package com.suza.promotion.services;

import com.suza.promotion.dto.NotificationDTO;
import com.suza.promotion.entity.Notification;
import com.suza.promotion.entity.User;
import com.suza.promotion.exception.ResourceNotFoundException;
import com.suza.promotion.repository.NotificationRepository;
import com.suza.promotion.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository,
                               UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public NotificationDTO createNotification(NotificationDTO dto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(dto.getTitle());
        notification.setMessage(dto.getMessage());
        notification.setType(Notification.NotificationType.valueOf(dto.getType()));
        notification.setCreatedAt(LocalDateTime.now());
        notification.setIsRead(false);

        return convertToDTO(notificationRepository.save(notification));
    }

    public List<NotificationDTO> getAllNotifications() {
        return notificationRepository.findAll()
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<NotificationDTO> getUserNotifications(Long userId) {
        return notificationRepository.findByUserId(userId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<NotificationDTO> getUnreadUserNotifications(Long userId) {
        return notificationRepository.findByUserIdAndIsReadFalse(userId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<NotificationDTO> getNotificationsByType(String type) {
        Notification.NotificationType enumType = Notification.NotificationType.valueOf(type.toUpperCase());
        return notificationRepository.findByType(enumType)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public NotificationDTO getNotificationById(Long id) {
        return convertToDTO(notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found")));
    }

    public NotificationDTO updateNotification(Long id, NotificationDTO dto) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));

        notification.setTitle(dto.getTitle());
        notification.setMessage(dto.getMessage());
        notification.setType(Notification.NotificationType.valueOf(dto.getType()));
        return convertToDTO(notificationRepository.save(notification));
    }

    public void deleteNotification(Long id) {
        if (!notificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Notification not found");
        }
        notificationRepository.deleteById(id);
    }

    public void markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        notification.setIsRead(true);
        notification.setReadAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }

    private NotificationDTO convertToDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setTitle(notification.getTitle());
        dto.setMessage(notification.getMessage());
        dto.setType(notification.getType().name());
        dto.setRead(notification.getIsRead());
        dto.setTimestamp(notification.getCreatedAt());
        return dto;
    }
}
