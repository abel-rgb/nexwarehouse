package com.warehouse.inventory_system.repository;

import com.warehouse.inventory_system.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}