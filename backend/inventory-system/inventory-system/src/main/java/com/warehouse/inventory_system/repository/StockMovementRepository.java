package com.warehouse.inventory_system.repository;

import com.warehouse.inventory_system.entity.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {
    List<StockMovement> findByItemId(Long itemId);
}