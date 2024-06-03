package com.presidio.rentify.user;

import com.presidio.rentify.entity.User;
import com.presidio.rentify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImp implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        log.info("Inside loadUserByUsername method");
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        if (!Objects.isNull(user)) {
            GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());
            List<GrantedAuthority> authorities = Collections.singletonList(authority);
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(), user.getPassword(), authorities);
        }
        else throw new UsernameNotFoundException("User not found" + username);
    }
}
