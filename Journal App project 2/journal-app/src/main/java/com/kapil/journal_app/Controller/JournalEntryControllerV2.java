package com.kapil.journal_app.Controller;

import com.kapil.journal_app.entity.JournalEntry;
import com.kapil.journal_app.entity.User;
import com.kapil.journal_app.service.UserService;
import com.kapil.journal_app.service.journalEntryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/journal")
public class JournalEntryControllerV2 {


    @Autowired
    private journalEntryService JournalEntryService;

    @Autowired
    private UserService userService;


    @PostMapping("{userName}")
    public ResponseEntity<JournalEntry> createEntry(@PathVariable String userName, @RequestBody JournalEntry entry) {
        try{
            JournalEntryService.saveEntry(entry, userName);
            return new  ResponseEntity<>(entry, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{userName}")
    public ResponseEntity<?> getAllJournalEntriesOfUser(@PathVariable String userName) {
        User user = userService.findByUserName(userName);
        if(user != null) {
            List<JournalEntry> userEntries = user.getJournalEntries();
            if (userEntries != null && !userEntries.isEmpty()) {
                return new ResponseEntity<>(userEntries, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<JournalEntry> getById(@PathVariable String id) {
        ObjectId objectId;
        try{
            objectId = new ObjectId(id);
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        }
        Optional<JournalEntry> journal = JournalEntryService.getById(objectId);

        if(journal.isPresent()) {
            return new ResponseEntity<>(journal.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{userName}/{id}")
    public ResponseEntity<JournalEntry> updateEntry(
            @PathVariable ObjectId id,
            @PathVariable String userName,
            @RequestBody JournalEntry newEntry) {
        Optional<JournalEntry> OptionalOld = JournalEntryService.getById(id);
        if(OptionalOld.isPresent()) {
            JournalEntry old = OptionalOld.get();
            if(old != null) {
                old.setTitle(newEntry.getTitle() != null && !newEntry.getTitle().equals("") ? newEntry.getTitle() : old.getTitle());
                old.setContent(newEntry.getContent() != null && !newEntry.getContent().equals("") ? newEntry.getContent() : old.getContent());
            }
            JournalEntryService.saveEntry(old);
            return new ResponseEntity<>(old, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("delete/id/{userName}/{id}")
    public ResponseEntity<?> deleteEntry(@PathVariable ObjectId id, @PathVariable String userName) {
        JournalEntryService.DeleteEntry(id, userName );
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

