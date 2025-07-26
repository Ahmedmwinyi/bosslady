package com.suza.promotion.repository;

import com.suza.promotion.entity.PromotionRequest;
import com.suza.promotion.entity.PromotionReview;
import com.suza.promotion.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionReviewRepository extends JpaRepository<PromotionReview, Long> {
    List<PromotionReview> findByReviewer(User reviewer);
    List<PromotionReview> findByPromotionRequest(PromotionRequest request);
    List<PromotionReview> findByDecision(PromotionReview.Decision decision);
    Optional<PromotionReview> findByPromotionRequestAndReviewer(PromotionRequest promotionRequest, User reviewer);
}
