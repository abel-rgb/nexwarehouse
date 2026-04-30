package com.warehouse.inventory_system.controller;

import com.warehouse.inventory_system.entity.Order;
import com.warehouse.inventory_system.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier")
@CrossOrigin(origins = "*")
public class SupplierController {

    private final OrderService orderService;

    public SupplierController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/order/update/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId,
                                                    @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
    }
}