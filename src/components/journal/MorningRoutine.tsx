import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { JournalEntry, MorningEntry } from '@/types/journal';
import { useJournal } from '@/contexts/JournalContext';
import { GratitudeInput } from './GratitudeInput';
import { TextAreaInput } from '../ui/TextAreaInput';
import { db } from '@/services/db';

interface MorningRoutineProps {
  entry: JournalEntry | null;
}

export function MorningRoutine({ entry }: MorningRoutineProps) {
  const { dispatch } = useJournal();
  const [morning, setMorning] = useState<MorningEntry>({
    gratitude: ['', '', ''],
    greatDay: '',
    affirmation: '',
    completedAt: null,
  });

  useEffect(() => {
    if (entry?.morning) {
      setMorning(entry.morning);
    }
  }, [entry]);

  const updateMorning = async (updates: Partial<MorningEntry>) => {
    if (!entry) return;

    const newMorning = { ...morning, ...updates };
    setMorning(newMorning);

    // Check if morning routine is complete
    const isComplete = 
      newMorning.gratitude.every(g => g.trim() !== '') &&
      newMorning.greatDay.trim() !== '' &&
      newMorning.affirmation.trim() !== '';

    if (isComplete && !newMorning.completedAt) {
      newMorning.completedAt = Date.now();
    }

    // Update in context and database
    const updatedEntry = {
      ...entry,
      morning: newMorning,
      updatedAt: Date.now(),
    };

    dispatch({ type: 'UPDATE_ENTRY', payload: { morning: newMorning } });
    
    try {
      await db.entries.update(entry.id, updatedEntry);
    } catch (error) {
      console.error('Error updating morning entry:', error);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Sun className="w-6 h-6 text-paper-600" />
        <h2 className="font-display text-2xl text-ink-primary">Morning Reflection</h2>
      </div>

      <div className="space-y-8 ruled-paper pb-4">
        <GratitudeInput
          gratitudes={morning.gratitude}
          onChange={(gratitudes) => updateMorning({ gratitude: gratitudes })}
        />

        <div className="space-y-2">
          <label className="block text-ink-secondary font-serif italic">
            What would make today great?
          </label>
          <TextAreaInput
            value={morning.greatDay}
            onChange={(value) => updateMorning({ greatDay: value })}
            placeholder="Write your intentions for the day..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-ink-secondary font-serif italic">
            Daily affirmation
          </label>
          <TextAreaInput
            value={morning.affirmation}
            onChange={(value) => updateMorning({ affirmation: value })}
            placeholder="I am..."
            className="min-h-[60px]"
          />
        </div>
      </div>

      {morning.completedAt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-ink-muted text-sm italic"
        >
          Morning reflection completed ✓
        </motion.div>
      )}
    </motion.section>
  );
}