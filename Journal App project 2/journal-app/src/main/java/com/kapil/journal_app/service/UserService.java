package com.kapil.journal_app.service;

import com.kapil.journal_app.Repository.UserRepo;
import com.kapil.journal_app.entity.User;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public void saveEntry(User user) {
        userRepo.save(user);
    }

    public List<User> showEntries() {
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
