package com.github.chMatvey.user;

import com.github.chMatvey.user.dto.RegistrationRequest;
import com.github.chMatvey.user.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UserApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }

    @Bean
    CommandLineRunner run(UserService userService) {
        return args -> {
            String username = "user";
            RegistrationRequest registrationRequest = new RegistrationRequest(username, username, username);
            userService.register(registrationRequest);
        };
    }
}
