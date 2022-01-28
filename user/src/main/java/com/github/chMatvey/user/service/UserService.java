package com.github.chMatvey.user.service;

import com.github.chMatvey.user.dto.LoginRequest;
import com.github.chMatvey.user.dto.RegistrationRequest;
import com.github.chMatvey.user.dto.UserResponse;

public interface UserService {
    UserResponse register(RegistrationRequest request);

    UserResponse login(LoginRequest request);
}
