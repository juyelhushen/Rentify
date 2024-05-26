package com.presidio.rentify.utils;

import com.presidio.rentify.entity.User;

@FunctionalInterface
public interface EmailService {
    void sendEmail(String to , User user);
}
