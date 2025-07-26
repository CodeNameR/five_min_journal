import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { JournalEntry, UserSettings } from '@/types/journal';
import { db } from '@/services/db';
import { format } from 'date-fns';

interface JournalState {
  currentEntry: JournalEntry | null;
  entries: Map<string, JournalEntry>;
  settings: UserSettings;
  isLoading: boolean;
  isSaving: boolean;
}

type JournalAction =
  | { type: 'SET_CURRENT_ENTRY'; payload: JournalEntry | null }
  | { type: 'UPDATE_ENTRY'; payload: Partial<JournalEntry> }
  | { type: 'SET_ENTRIES'; payload: JournalEntry[] }
  | { type: 'SET_SETTINGS'; payload: UserSettings }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SAVING'; payload: boolean };

const defaultSettings: UserSettings = {
  theme: 'light',
  fontSize: 'medium',
  fontFamily: 'serif',
  enableAnimations: true,
  enableRuledLines: false,
};

const initialState: JournalState = {
  currentEntry: null,
  entries: new Map(),
  settings: defaultSettings,
  isLoading: true,
  isSaving: false,
};

const JournalContext = createContext<{
  state: JournalState;
  dispatch: React.Dispatch<JournalAction>;
} | null>(null);

function journalReducer(state: JournalState, action: JournalAction): JournalState {
  switch (action.type) {
    case 'SET_CURRENT_ENTRY':
      return { ...state, currentEntry: action.payload };
    
    case 'UPDATE_ENTRY':
      if (!state.currentEntry) return state;
      const updatedEntry = { ...state.currentEntry, ...action.payload, updatedAt: Date.now() };
      const newEntries = new Map(state.entries);
      newEntries.set(updatedEntry.date, updatedEntry);
      return { 
        ...state, 
        currentEntry: updatedEntry,
        entries: newEntries
      };
    
    case 'SET_ENTRIES':
      const entriesMap = new Map();
      action.payload.forEach(entry => {
        entriesMap.set(entry.date, entry);
      });
      return { ...state, entries: entriesMap };
    
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_SAVING':
      return { ...state, isSaving: action.payload };
    
    default:
      return state;
  }
}

export function JournalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(journalReducer, initialState);

  // Load today's entry on mount
  useEffect(() => {
    const loadTodayEntry = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const today = format(new Date(), 'yyyy-MM-dd');
        const entry = await db.entries.where('date').equals(today).first();
        
        if (entry) {
          dispatch({ type: 'SET_CURRENT_ENTRY', payload: entry });
        } else {
          // Create a new entry for today
          const newEntry: JournalEntry = {
            id: crypto.randomUUID(),
            date: today,
            morning: null,
            evening: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            version: 1,
          };
          await db.entries.add(newEntry);
          dispatch({ type: 'SET_CURRENT_ENTRY', payload: newEntry });
        }
      } catch (error) {
        console.error('Error loading today entry:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadTodayEntry();
  }, []);

  return (
    <JournalContext.Provider value={{ state, dispatch }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}