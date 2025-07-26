import Dexie, { Table } from 'dexie';
import { JournalEntry, UserSettings } from '@/types/journal';

export class JournalDatabase extends Dexie {
  entries!: Table<JournalEntry>;
  settings!: Table<UserSettings>;

  constructor() {
    super('FiveMinuteJournal');
    
    this.version(1).stores({
      entries: 'id, date, createdAt, updatedAt',
      settings: 'id'
    });
  }
}

export const db = new JournalDatabase();