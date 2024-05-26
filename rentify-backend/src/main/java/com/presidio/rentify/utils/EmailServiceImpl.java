package com.presidio.rentify.utils;

import com.presidio.rentify.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {


    private final JavaMailSender mailSender;

    @Override
    public void sendEmail(String to, User user) {

        String subject = "Landlord Detial";
        String text = String.format(
                "Dear Customer,%n%n" +
                        "Please find below the details of the owner:%n%n" +
                        "Name: %s%n" +
                        "Phone: %s%n" +
                        "Email: %s%n" +
                        "If you have any further questions, feel free to contact us.%n%n" +
                        "Best regards,%n" +
                        "Rentify.",
                user.getFirstname() + user.getLastname(), user.getPhoneNumber(), user.getEmail()
        );


        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("hushenjuyel@gmail.com");

        mailSender.send(message);

    }
}
