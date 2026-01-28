package com.kapil.journal_app.service;

import com.kapil.journal_app.Repository.JournalEntryRepo;
import com.kapil.journal_app.entity.JournalEntry;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class journalEntryService {

    @Autowired
    private JournalEntryRepo journalEntryRepo;

    public void saveEntry(JournalEntry journalEntry) {
        journalEntryRepo.save(journalEntry);
    }

    public List<JournalEntry> showEntries() {
        return journalEntryRepo.findAll();
    }

    public JournalEntry getById(ObjectId id) {
        return  journalEntryRepo.findById(id).orElseThrow(() -> new RuntimeException("Journal Entry not found"));
    }

    public void DeleteEntry(ObjectId id) {
        journalEntryRepo.deleteById(id);
    }

}
