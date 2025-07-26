export interface JournalEntry {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  morning: MorningEntry | null;
  evening: EveningEntry | null;
  createdAt: number;
  updatedAt: number;
  version: number;
}

export interface MorningEntry {
  gratitude: string[]; // Array of 3 items
  greatDay: string;
  affirmation: string;
  completedAt: number | null;
}

export interface EveningEntry {
  amazingThings: string[]; // Array of 3 items
  improvements: string;
  completedAt: number | null;
}

export interface UserSettings {
  theme: 'light' | 'sepia' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'serif' | 'handwriting';
  enableAnimations: boolean;
  enableRuledLines: boolean;
}

export type EntrySection = 'morning' | 'evening';
export type CompletionStatus = 'empty' | 'partial' | 'complete';