package com.warehouse.inventory_system.controller;

import com.warehouse.inventory_system.entity.User;
import com.warehouse.inventory_system.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")   // 🔥 ADD THIS LINE
@RestController
@RequestMapping("/api/users")
public class TestController {

    private final UserRepository userRepository;

    public TestController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ CREATE
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ✅ GET ALL
    @GetMapping
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return "User not found";
        }
        userRepository.deleteById(id);
        return "User deleted";
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public Object updateUser(@PathVariable Long id, @RequestBody User updatedUser) {

        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();

        user.setUsername(updatedUser.getUsername());
        user.setPassword(updatedUser.getPassword());
        user.setEmail(updatedUser.getEmail());
        user.setRole(updatedUser.getRole());

        return userRepository.save(user);
    }
}