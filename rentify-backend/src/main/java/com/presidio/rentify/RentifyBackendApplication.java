package com.presidio.rentify;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@OpenAPIDefinition(info = @Info(title = "Rentify's apis", description = "Documentation " +
        "for Rentify apis", version = "v.1.0"))
@SpringBootApplication
@EnableJpaAuditing
public class RentifyBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(RentifyBackendApplication.class, args);
    }

}
