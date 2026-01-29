package com.kapil.journal_app.Repository;

import com.kapil.journal_app.entity.JournalEntry;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

public interface JournalEntryRepo extends MongoRepository<JournalEntry, ObjectId> {
}
