package com.suza.promotion.repository;


import com.suza.promotion.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(Long userId);

    List<Notification> findByType(Notification.NotificationType type);
    List<Notification> findByUserIdAndIsReadFalse(Long userId);
    

}