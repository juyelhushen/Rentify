package com.presidio.rentify.controller;

import com.presidio.rentify.entity.User;
import com.presidio.rentify.payload.AuthResponse;
import com.presidio.rentify.payload.LoginRequest;
import com.presidio.rentify.payload.PropertyResponse;
import com.presidio.rentify.payload.RegisterRequest;
import com.presidio.rentify.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "https://master--rentifydev.netlify.app")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @GetMapping("/{userid}")
    public ResponseEntity<User> getUserById(@PathVariable long userid) throws Exception {
        return ResponseEntity.ok(userService.findById(userid));
    }

    @PreAuthorize("hasAuthority('LANDLORD')")
    @GetMapping()
    public ResponseEntity<UserDetails> getCurrentUser() throws Exception {
        return ResponseEntity.ok(userService.getCurrentUser());
    }
}
