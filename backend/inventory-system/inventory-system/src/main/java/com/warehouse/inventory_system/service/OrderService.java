package com.warehouse.inventory_system.service;

import com.warehouse.inventory_system.entity.Item;
import com.warehouse.inventory_system.entity.Order;
import com.warehouse.inventory_system.entity.Supplier;
import com.warehouse.inventory_system.repository.ItemRepository;
import com.warehouse.inventory_system.repository.OrderRepository;
import com.warehouse.inventory_system.repository.SupplierRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final SupplierRepository supplierRepository;
    private final ItemRepository itemRepository;

    public OrderService(OrderRepository orderRepository,
                        SupplierRepository supplierRepository,
                        ItemRepository itemRepository) {
        this.orderRepository = orderRepository;
        this.supplierRepository = supplierRepository;
        this.itemRepository = itemRepository;
    }

    public Order createOrder(Long supplierId, Long itemId, Order order) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        order.setSupplier(supplier);
        order.setStatus("PENDING");

        if (itemId != null) {
            Item item = itemRepository.findById(itemId)
                    .orElseThrow(() -> new RuntimeException("Item not found"));
            order.setItem(item);
        }

        return orderRepository.save(order);
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        String previousStatus = order.getStatus();
        order.setStatus(status);
        orderRepository.save(order);

        // ✅ Auto-update item stock when order is DELIVERED
        if (status.equals("DELIVERED") && !previousStatus.equals("DELIVERED")) {
            if (order.getItem() != null) {
                Item item = order.getItem();
                item.setQuantity(item.getQuantity() + order.getQuantity());
                itemRepository.save(item);
            }
        }

        return order;
    }

    public List<Order> getOrdersBySupplierId(Long supplierId) {
        return orderRepository.findBySupplierId(supplierId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}