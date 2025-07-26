package com.suza.promotion.repository;

import com.suza.promotion.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SchoolRepository extends JpaRepository<School, Long> {
}