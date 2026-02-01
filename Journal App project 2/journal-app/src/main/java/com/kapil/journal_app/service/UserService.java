package com.kapil.journal_app.service;

import com.kapil.journal_app.Repository.UserRepo;
import com.kapil.journal_app.entity.User;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class UserService {

    @Autowired
    private UserRepo userRepo;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

 /*
    If we use this function to save the user, user password is saved in database as user entered it
     it will not be encoded
     So, we create an another function(saveNewUser) which saves user password in encoded form in database

*/
    public void saveEntry(User user) {
        userRepo.save(user);
    }


    public void saveNewUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER"));
        userRepo.save(user);
    }

    public void addAdmin(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER", "ADMIN"));
        userRepo.save(user);
    }

    public List<User> getAll() {

        return userRepo.findAll();
    }

    public Optional<User> getById(ObjectId id) {
        return userRepo.findById(id);
    }

    public void DeleteEntry(String userName) {
       ObjectId id =  userRepo.findByUserName(userName).getId();
       userRepo.deleteById(id);
    }

    public User findByUserName(String userName) {
        return userRepo.findByUserName(userName);
    }


}
