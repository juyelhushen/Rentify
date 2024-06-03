package com.presidio.rentify.service;

import com.presidio.rentify.entity.Property;
import com.presidio.rentify.entity.Role;
import com.presidio.rentify.entity.User;
import com.presidio.rentify.jwt.AuthFilter;
import com.presidio.rentify.jwt.JwtUtils;
import com.presidio.rentify.payload.AuthResponse;
import com.presidio.rentify.payload.LoginRequest;
import com.presidio.rentify.payload.PropertyResponse;
import com.presidio.rentify.payload.RegisterRequest;
import com.presidio.rentify.repository.PropertyRepository;
import com.presidio.rentify.repository.UserRepository;
import com.presidio.rentify.user.UserDetailsServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImp userDetailsService;
    private final AuthFilter authFilter;
    private final PropertyRepository propertyRepository;


    @Override
    public ResponseEntity<AuthResponse> register(RegisterRequest request) {
        AuthResponse response = new AuthResponse();
        if (registerValidate(request)) {
            Optional<User> user = userRepository.findByEmail(request.getEmail());
            if (user.isPresent())
                throw new IllegalArgumentException("Email is already used with another account");
            User savedUser = userRepository.save(saveUser(request));

            Authentication auth = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
            SecurityContextHolder.getContext().setAuthentication(auth);

            String jwtToken = jwtUtils.generate(savedUser.getId(), savedUser.getEmail(), savedUser.getRole());
            response.setToken(jwtToken);
            response.setRole(savedUser.getRole().toString());
            response.setMessage("Registration successful");
        }
        return ResponseEntity.ok(response);
    }

    private User saveUser(RegisterRequest request) {
        return User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .role(Role.valueOf(request.getRole()))
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
    }

    private boolean registerValidate(RegisterRequest request) {
        return request.getFirstname() != null &&
                request.getLastname() != null &&
                request.getEmail() != null &&
                request.getPhoneNumber() != null;
    }

    @Override
    public ResponseEntity<AuthResponse> login(LoginRequest request) {
        try {
            AuthResponse response = new AuthResponse();
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getEmail(), request.getPassword()
                            )
                    );

            if (authenticate.isAuthenticated()) {
                User user = userRepository.findByEmail(request.getEmail())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + request.getEmail()));
                SecurityContextHolder.getContext().setAuthentication(authenticate);
                String token = jwtUtils.generate(user.getId(), user.getEmail(), user.getRole());
                response.setToken(token);
                response.setRole(user.getRole().toString());
                response.setMessage("Login success");
            }
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }


    @Override
    public User findById(Long id) throws Exception {
        return userRepository.findById(id)
                .orElseThrow(() -> new Exception("User not found with id " + id));
    }


    @Override
    public User getCurrent() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new Exception("User not found with username : " + userDetails.getUsername()));
    }

    @Override
    public UserDetails getCurrentUser() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails;
    }


    @Override
    public boolean ifLikedProperty(long propertyId) throws Exception {
        return getCurrent().getLikedProperty().stream()
                .anyMatch(likedProperty -> likedProperty.equals(propertyId));
    }

    @Override
    public void addToLiked(long propertyId) throws Exception {
        User user = getCurrent();
        user.addToLikedProperty(propertyId);
        userRepository.save(user);
    }

    @Override
    public void removeFromLiked(long propertyId) throws Exception {
        User user = getCurrent();
        user.removeFromLikedProperty(propertyId);
        userRepository.save(user);
    }
}
