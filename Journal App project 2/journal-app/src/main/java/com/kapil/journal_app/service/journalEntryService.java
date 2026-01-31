package com.kapil.journal_app.service;

import com.kapil.journal_app.Repository.JournalEntryRepo;
import com.kapil.journal_app.entity.JournalEntry;
import com.kapil.journal_app.entity.User;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class journalEntryService {

    @Autowired
    private JournalEntryRepo journalEntryRepo;

    @Autowired
    private UserService userService;

    @Transactional // is annotation se agar is function me kahi par bhi koe exception aati h to exception se pehle save
                    // ki gayi entry automatically rollback(delete) ho jayegi

                //For Example : userService.save(journalEntry) wali line me exception aati h to
            // automatically pehle wala pura code rollback ho jayega
            //  (jo bhi data database mein save kiya h vo delete ho jayega uss specific entry ka)
    public void saveEntry(JournalEntry journalEntry, String userName) {
        try {
            User user = userService.findByUserName(userName);
            journalEntry.setDate(LocalDateTime.now());
           JournalEntry saved = journalEntryRepo.save(journalEntry);
            user.getJournalEntries().add(saved);
            userService.saveEntry(user);
        } catch(Exception e ) {
            System.out.println(e);
            throw new RuntimeException("An error occured while saving this entry " + e);
        }
    }

    public void saveEntry(JournalEntry journalEntry) {
        journalEntryRepo.save(journalEntry);
    }

    public List<JournalEntry> showEntries() {
        return journalEntryRepo.findAll();
    }

    public Optional<JournalEntry> getById(ObjectId id) {
        return  journalEntryRepo.findById(id);
    }

    @Transactional
    public boolean DeleteEntry(ObjectId id, String userName) {
        boolean removed = false;
        try {
            User user = userService.findByUserName(userName);
            removed = user.getJournalEntries().removeIf(x -> x.getId().equals(id));
            if(removed) {
                userService.saveEntry(user);
                journalEntryRepo.deleteById(id);
                return removed;
            }
        } catch (Exception e) {
            throw new RuntimeException("AN error occured while deleting the entry " + e);
        }
        return removed;

    }



}
