package com.kapil.journal_app.Controller;

import com.kapil.journal_app.entity.User;
import com.kapil.journal_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserService userService;

    @PostMapping("/create-user")
    public void CreateUser(@RequestBody User newUser) {

        userService.saveNewUser(newUser);
    }
}
