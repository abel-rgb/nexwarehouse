package com.warehouse.inventory_system.controller;

import com.warehouse.inventory_system.entity.Item;
import com.warehouse.inventory_system.entity.StockMovement;
import com.warehouse.inventory_system.service.ItemService;
import com.warehouse.inventory_system.service.StockService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*")
public class StaffController {

    private final ItemService itemService;
    private final StockService stockService;

    public StaffController(ItemService itemService, StockService stockService) {
        this.itemService = itemService;
        this.stockService = stockService;
    }

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @PostMapping("/stock")
    public ResponseEntity<StockMovement> updateStock(@RequestParam Long itemId,
                                                      @RequestParam String type,
                                                      @RequestBody StockMovement movement) {
        return ResponseEntity.ok(
            stockService.updateStock(itemId, type, movement.getQuantity())
        );
    }

    @GetMapping("/stock")
    public ResponseEntity<List<StockMovement>> getAllMovements() {
        return ResponseEntity.ok(stockService.getAllMovements());
    }
}