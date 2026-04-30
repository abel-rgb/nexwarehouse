package com.warehouse.inventory_system.controller;

import com.warehouse.inventory_system.entity.User;
import com.warehouse.inventory_system.jwt.JwtUtil;
import com.warehouse.inventory_system.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, JwtUtil jwtUtil,
                          AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User saved = userService.registerUser(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    user.getUsername(), user.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        String role = userDetails.getAuthorities().iterator().next()
                .getAuthority().replace("ROLE_", "");
        String token = jwtUtil.generateToken(user.getUsername(), role);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", role);
        return ResponseEntity.ok(response);
    }
}