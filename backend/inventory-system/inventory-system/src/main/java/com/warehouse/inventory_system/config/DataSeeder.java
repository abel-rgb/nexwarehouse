package com.warehouse.inventory_system.config;

import com.warehouse.inventory_system.entity.*;
import com.warehouse.inventory_system.repository.*;
import com.warehouse.inventory_system.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final SupplierRepository supplierRepository;
    private final OrderRepository orderRepository;
    private final StockMovementRepository stockMovementRepository;

    public DataSeeder(UserService userService,
                      UserRepository userRepository,
                      ItemRepository itemRepository,
                      SupplierRepository supplierRepository,
                      OrderRepository orderRepository,
                      StockMovementRepository stockMovementRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
        this.supplierRepository = supplierRepository;
        this.orderRepository = orderRepository;
        this.stockMovementRepository = stockMovementRepository;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedItems();
        seedSuppliers();
        seedOrders();
        seedStockMovements();
    }

    private void seedUsers() {
        seedUser("admin1", "12345", "admin@mail.com", "ADMIN");
        seedUser("staff1", "12345", "staff@mail.com", "STAFF");
        seedUser("supplier1", "12345", "supplier@mail.com", "SUPPLIER");
    }

    private void seedUser(String username, String password, String email, String role) {
        if (userRepository.findByUsername(username).isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setEmail(email);
            user.setRole(role);
            userService.registerUser(user);
            System.out.println("✅ Seeded user: " + username);
        }
    }

    private void seedItems() {
        if (itemRepository.count() == 0) {
            String[][] items = {
                {"Laptop", "50", "Dell XPS 15 laptops for office use"},
                {"Mouse", "150", "Wireless optical mouse"},
                {"Keyboard", "120", "Mechanical keyboard USB"},
                {"Monitor", "30", "24 inch Full HD monitor"},
                {"Headphones", "75", "Noise cancelling headphones"},
                {"Webcam", "8", "1080p HD webcam"},
                {"USB Hub", "200", "7-port USB 3.0 hub"},
                {"Desk Chair", "5", "Ergonomic office chair"},
                {"Standing Desk", "12", "Height adjustable standing desk"},
                {"Printer", "20", "Color laser printer"},
                {"Scanner", "15", "Flatbed document scanner"},
                {"Projector", "6", "4K business projector"},
                {"Router", "45", "WiFi 6 wireless router"},
                {"Switch", "22", "24-port network switch"},
                {"Server Rack", "3", "42U server rack cabinet"}
            };
            for (String[] data : items) {
                Item item = new Item();
                item.setName(data[0]);
                item.setQuantity(Integer.parseInt(data[1]));
                item.setDescription(data[2]);
                itemRepository.save(item);
            }
            System.out.println("✅ Seeded 15 items");
        }
    }

    private void seedSuppliers() {
        if (supplierRepository.count() == 0) {
            String[][] suppliers = {
                {"TechCorp Solutions", "+91-9876543210", "techcorp@supply.com"},
                {"GlobalTech Imports", "+91-9123456789", "globaltech@supply.com"},
                {"FastShip Logistics", "+91-9988776655", "fastship@supply.com"},
                {"Prime Electronics", "+91-9765432109", "prime@electronics.com"},
                {"Mega Supplies Ltd", "+91-9654321098", "mega@supplies.com"}
            };
            for (String[] data : suppliers) {
                Supplier supplier = new Supplier();
                supplier.setName(data[0]);
                supplier.setContactInfo(data[1]);
                supplier.setEmail(data[2]);
                supplierRepository.save(supplier);
            }
            System.out.println("✅ Seeded 5 suppliers");
        }
    }

    private void seedOrders() {
        if (orderRepository.count() == 0) {
            List<Supplier> suppliers = supplierRepository.findAll();
            List<Item> items = itemRepository.findAll();

            Object[][] orders = {
                {suppliers.get(0), items.get(0), "2024-01-15", "DELIVERED", 100},
                {suppliers.get(1), items.get(1), "2024-02-20", "DELIVERED", 50},
                {suppliers.get(2), items.get(2), "2024-03-10", "DELIVERED", 200},
                {suppliers.get(0), items.get(3), "2024-04-05", "PENDING", 75},
                {suppliers.get(1), items.get(4), "2024-05-18", "DELIVERED", 30},
                {suppliers.get(2), items.get(5), "2024-06-22", "PENDING", 150},
                {suppliers.get(0), items.get(6), "2024-07-14", "DELIVERED", 80},
                {suppliers.get(1), items.get(7), "2024-08-30", "PENDING", 60},
                {suppliers.get(3), items.get(8), "2024-09-15", "PENDING", 21},
                {suppliers.get(4), items.get(9), "2025-02-02", "PENDING", 10}
            };

            for (Object[] data : orders) {
                Order order = new Order();
                order.setSupplier((Supplier) data[0]);
                order.setItem((Item) data[1]);
                order.setOrderDate(LocalDate.parse((String) data[2]));
                order.setStatus((String) data[3]);
                order.setQuantity((Integer) data[4]);
                orderRepository.save(order);
            }
            System.out.println("✅ Seeded 10 orders");
        }
    }

    private void seedStockMovements() {
        if (stockMovementRepository.count() == 0) {
            List<Item> items = itemRepository.findAll();
            Object[][] movements = {
                {items.get(0), "IN", 50},
                {items.get(1), "IN", 150},
                {items.get(0), "OUT", 10},
                {items.get(2), "IN", 120},
                {items.get(3), "IN", 30},
                {items.get(1), "OUT", 20},
                {items.get(4), "IN", 75},
                {items.get(5), "IN", 25},
                {items.get(5), "OUT", 17},
                {items.get(6), "IN", 200},
                {items.get(7), "IN", 15},
                {items.get(7), "OUT", 10},
                {items.get(8), "IN", 12},
                {items.get(9), "IN", 20},
                {items.get(9), "OUT", 5}
            };
            for (Object[] data : movements) {
                StockMovement movement = new StockMovement();
                movement.setItem((Item) data[0]);
                movement.setType((String) data[1]);
                movement.setQuantity((Integer) data[2]);
                movement.setTimestamp(LocalDateTime.now().minusDays((long)(Math.random() * 30)));
                stockMovementRepository.save(movement);
            }
            System.out.println("✅ Seeded 15 stock movements");
        }
    }
}