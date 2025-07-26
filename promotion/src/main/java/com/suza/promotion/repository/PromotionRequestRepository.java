package com.suza.promotion.repository;

import com.suza.promotion.entity.PromotionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionRequestRepository extends JpaRepository<PromotionRequest, Long> {
    List<PromotionRequest> findByApplicantId(Long applicantId);
    List<PromotionRequest> findByStatus(PromotionRequest.Status status);
    List<PromotionRequest> findByDepartmentId(Long departmentId);
    List<PromotionRequest> findBySchoolId(Long schoolId);

}