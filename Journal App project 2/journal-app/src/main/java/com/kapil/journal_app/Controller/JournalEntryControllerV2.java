package com.kapil.journal_app.Controller;

import com.kapil.journal_app.entity.JournalEntry;
import com.kapil.journal_app.service.journalEntryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.ConditionalOnOAuth2ClientRegistrationProperties;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/journal")
public class JournalEntryControllerV2 {


    @Autowired
    private journalEntryService JournalEntryService;


    @PostMapping
    public JournalEntry createEntry(@RequestBody JournalEntry entry) {
        entry.setDate(LocalDateTime.now());
        JournalEntryService.saveEntry(entry);
        return entry;
    }

    @GetMapping
    public List<JournalEntry> getAll() {
         return JournalEntryService.showEntries();
    }

    @GetMapping("/id/{id}")
    public JournalEntry getById(@PathVariable ObjectId id) {
        return JournalEntryService.getById(id);
    }

    @PutMapping("/update/{id}")
    public JournalEntry updateEntry(@PathVariable ObjectId id,@RequestBody JournalEntry newEntry) {
        JournalEntry old = JournalEntryService.getById(id);
        if(old != null) {
            old.setTitle(newEntry.getTitle() != null && !newEntry.getTitle().equals("") ? newEntry.getTitle() : old.getTitle());
            old.setContent(newEntry.getContent() != null && !newEntry.getContent().equals("") ? newEntry.getContent() : old.getContent());
        }
        JournalEntryService.saveEntry(old);
        return old;
    }

    @DeleteMapping("delete/id/{id}")
    public void deleteEntry(@PathVariable ObjectId id) {
        JournalEntryService.DeleteEntry(id);
    }



}

