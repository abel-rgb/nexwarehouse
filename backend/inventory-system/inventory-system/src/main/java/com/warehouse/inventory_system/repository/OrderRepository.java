package com.warehouse.inventory_system.repository;

import com.warehouse.inventory_system.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findBySupplierId(Long supplierId);
}