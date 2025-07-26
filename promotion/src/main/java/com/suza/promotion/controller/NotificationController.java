package com.suza.promotion.controller;

import com.suza.promotion.dto.NotificationDTO;
import com.suza.promotion.services.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/user/{userId}")
    public NotificationDTO create(@RequestBody NotificationDTO dto, @PathVariable Long userId) {
        return notificationService.createNotification(dto, userId);
    }

    @GetMapping
    public List<NotificationDTO> getAll() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public NotificationDTO getById(@PathVariable Long id) {
        return notificationService.getNotificationById(id);
    }

    @PutMapping("/{id}")
    public NotificationDTO update(@PathVariable Long id, @RequestBody NotificationDTO dto) {
        return notificationService.updateNotification(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.deleteNotification(id);
    }

    @PostMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }

    @GetMapping("/user/{userId}")
    public List<NotificationDTO> getByUser(@PathVariable Long userId) {
        return notificationService.getUserNotifications(userId);
    }

    @GetMapping("/user/{userId}/unread")
    public List<NotificationDTO> getUnreadByUser(@PathVariable Long userId) {
        return notificationService.getUnreadUserNotifications(userId);
    }

    @GetMapping("/type/{type}")
    public List<NotificationDTO> getByType(@PathVariable String type) {
        return notificationService.getNotificationsByType(type);
    }
}
