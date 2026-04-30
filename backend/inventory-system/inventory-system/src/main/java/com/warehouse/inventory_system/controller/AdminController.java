package com.warehouse.inventory_system.controller;

import com.warehouse.inventory_system.entity.Item;
import com.warehouse.inventory_system.entity.Order;
import com.warehouse.inventory_system.entity.Supplier;
import com.warehouse.inventory_system.entity.User;
import com.warehouse.inventory_system.service.ItemService;
import com.warehouse.inventory_system.service.OrderService;
import com.warehouse.inventory_system.service.SupplierService;
import com.warehouse.inventory_system.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final ItemService itemService;
    private final SupplierService supplierService;
    private final OrderService orderService;
    private final UserService userService;

    public AdminController(ItemService itemService,
                           SupplierService supplierService,
                           OrderService orderService,
                           UserService userService) {
        this.itemService = itemService;
        this.supplierService = supplierService;
        this.orderService = orderService;
        this.userService = userService;
    }

    // ─── USER ENDPOINTS ───────────────────────────
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }

    // ─── ITEM ENDPOINTS ───────────────────────────
    @PostMapping("/item")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        return ResponseEntity.ok(itemService.addItem(item));
    }

    @PutMapping("/item/{itemId}")
    public ResponseEntity<Item> updateItem(@PathVariable Long itemId,
                                           @RequestBody Item item) {
        return ResponseEntity.ok(itemService.updateItem(itemId, item));
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable Long itemId) {
        itemService.deleteItem(itemId);
        return ResponseEntity.ok("Item deleted");
    }

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    // ─── SUPPLIER ENDPOINTS ───────────────────────
    @PostMapping("/supplier")
    public ResponseEntity<Supplier> addSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(supplierService.addSupplier(supplier));
    }

    @GetMapping("/suppliers")
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    @DeleteMapping("/supplier/{id}")
public ResponseEntity<?> deleteSupplier(@PathVariable Long id) {
    supplierService.deleteSupplier(id);
    return ResponseEntity.ok("Supplier deleted");
}

    // ─── ORDER ENDPOINTS ──────────────────────────
    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(
            @RequestParam Long supplierId,
            @RequestParam(required = false) Long itemId,
            @RequestBody Order order) {
        return ResponseEntity.ok(orderService.createOrder(supplierId, itemId, order));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}