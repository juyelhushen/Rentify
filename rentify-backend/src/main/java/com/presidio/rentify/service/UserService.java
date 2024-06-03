package com.presidio.rentify.service;

import com.presidio.rentify.entity.User;
import com.presidio.rentify.payload.AuthResponse;
import com.presidio.rentify.payload.LoginRequest;
import com.presidio.rentify.payload.PropertyResponse;
import com.presidio.rentify.payload.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {

    ResponseEntity<AuthResponse> register(RegisterRequest request);

    ResponseEntity<AuthResponse> login(LoginRequest request);

    User findById(Long id) throws Exception;

    User getCurrent() throws Exception;

    UserDetails getCurrentUser() throws Exception;

    public boolean ifLikedProperty(long propertyId) throws Exception;

    void addToLiked(long propertyId) throws Exception;

    void removeFromLiked(long propertyId) throws Exception;
}
