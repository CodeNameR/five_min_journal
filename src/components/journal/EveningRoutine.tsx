import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { JournalEntry, EveningEntry } from '@/types/journal';
import { useJournal } from '@/contexts/JournalContext';
import { GratitudeInput } from './GratitudeInput';
import { TextAreaInput } from '../ui/TextAreaInput';
import { db } from '@/services/db';

interface EveningRoutineProps {
  entry: JournalEntry | null;
}

export function EveningRoutine({ entry }: EveningRoutineProps) {
  const { dispatch } = useJournal();
  const [evening, setEvening] = useState<EveningEntry>({
    amazingThings: ['', '', ''],
    improvements: '',
    completedAt: null,
  });

  useEffect(() => {
    if (entry?.evening) {
      setEvening(entry.evening);
    }
  }, [entry]);

  const updateEvening = async (updates: Partial<EveningEntry>) => {
    if (!entry) return;

    const newEvening = { ...evening, ...updates };
    setEvening(newEvening);

    // Check if evening routine is complete
    const isComplete = 
      newEvening.amazingThings.every(t => t.trim() !== '') &&
      newEvening.improvements.trim() !== '';

    if (isComplete && !newEvening.completedAt) {
      newEvening.completedAt = Date.now();
    }

    // Update in context and database
    const updatedEntry = {
      ...entry,
      evening: newEvening,
      updatedAt: Date.now(),
    };

    dispatch({ type: 'UPDATE_ENTRY', payload: { evening: newEvening } });
    
    try {
      await db.entries.update(entry.id, updatedEntry);
    } catch (error) {
      console.error('Error updating evening entry:', error);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Moon className="w-6 h-6 text-paper-700" />
        <h2 className="font-display text-2xl text-ink-primary">Evening Reflection</h2>
      </div>

      <div className="space-y-8 ruled-paper pb-4">
        <div className="space-y-2">
          <label className="block text-ink-secondary font-serif italic">
            3 amazing things that happened today
          </label>
          <GratitudeInput
            gratitudes={evening.amazingThings}
            onChange={(amazingThings) => updateEvening({ amazingThings })}
            placeholder="Something wonderful that happened..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-ink-secondary font-serif italic">
            How could I have made today even better?
          </label>
          <TextAreaInput
            value={evening.improvements}
            onChange={(value) => updateEvening({ improvements: value })}
            placeholder="Reflect on areas for growth..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      {evening.completedAt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-ink-muted text-sm italic"
        >
          Evening reflection completed ✓
        </motion.div>
      )}
    </motion.section>
  );
}