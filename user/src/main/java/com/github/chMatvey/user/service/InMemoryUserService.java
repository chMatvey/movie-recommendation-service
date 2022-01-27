package com.github.chMatvey.user.service;

import com.github.chMatvey.user.dto.LoginRequest;
import com.github.chMatvey.user.dto.RegistrationRequest;
import com.github.chMatvey.user.dto.UserResponse;
import com.github.chMatvey.user.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
public class InMemoryUserService implements UserService {
    private final Map<String, User> userMap = new ConcurrentHashMap<>();

    @Override
    public UserResponse register(RegistrationRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new ResponseStatusException(BAD_REQUEST, "Password mismatch");
        }
        if (userMap.containsKey(request.getUsername())) {
            throw new ResponseStatusException(BAD_REQUEST, "Username already exist");
        }

        User user = new User(request.getUsername(), request.getPassword());
        userMap.put(user.getUsername(), user);

        return new UserResponse(user.getUsername());
    }

    @Override
    public UserResponse login(LoginRequest request) {
        User user = userMap.get(request.getUsername());
        if (user == null) {
            throw new ResponseStatusException(BAD_REQUEST, "User not found");
        }
        if (!user.getPassword().equals(request.getPassword())) {
            throw new ResponseStatusException(BAD_REQUEST, "Incorrect password");
        }

        return new UserResponse(user.getUsername());
    }
}
