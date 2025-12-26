package com.substring.auth.auth_app.services.impl;

import com.substring.auth.auth_app.dtos.UserDto;
import com.substring.auth.auth_app.services.AuthService;
import com.substring.auth.auth_app.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserService userService;

    @Override
    public UserDto registerUser(UserDto userDto) {

        // we can write any logic here like verify user email, verify password, default roles -->
        UserDto userDto1 = userService.createUser(userDto);
        return userDto1;
    }

    @Override
    public UserDto res() {
        return null;
    }
}
