package com.warehouse.inventory_system.service;

import com.warehouse.inventory_system.entity.Item;
import com.warehouse.inventory_system.entity.StockMovement;
import com.warehouse.inventory_system.repository.ItemRepository;
import com.warehouse.inventory_system.repository.StockMovementRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StockService {

    private final ItemRepository itemRepository;
    private final StockMovementRepository stockMovementRepository;

    public StockService(ItemRepository itemRepository,
                        StockMovementRepository stockMovementRepository) {
        this.itemRepository = itemRepository;
        this.stockMovementRepository = stockMovementRepository;
    }

    public StockMovement updateStock(Long itemId, String type, int quantity) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (type.equalsIgnoreCase("IN")) {
            item.setQuantity(item.getQuantity() + quantity);
        } else if (type.equalsIgnoreCase("OUT")) {
            if (item.getQuantity() < quantity) {
                throw new RuntimeException("Insufficient stock");
            }
            item.setQuantity(item.getQuantity() - quantity);
        } else {
            throw new RuntimeException("Invalid type. Use IN or OUT");
        }

        itemRepository.save(item);

        StockMovement movement = new StockMovement();
        movement.setItem(item);
        movement.setType(type.toUpperCase());
        movement.setQuantity(quantity);
        movement.setTimestamp(LocalDateTime.now());

        return stockMovementRepository.save(movement);
    }

    public List<StockMovement> getAllMovements() {
        return stockMovementRepository.findAll();
    }
}