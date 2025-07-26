import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { JournalEntry } from '@/types/journal';
import { db } from '@/services/db';
import { MorningRoutine } from '@/components/journal/MorningRoutine';
import { EveningRoutine } from '@/components/journal/EveningRoutine';
import { DateHeader } from '@/components/journal/DateHeader';
import { Loader } from '@/components/ui/Loader';

export function TodayEntry() {
  const { date } = useParams();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const displayDate = date || format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    const loadEntry = async () => {
      setIsLoading(true);
      try {
        let journalEntry = await db.entries.where('date').equals(displayDate).first();
        
        if (!journalEntry) {
          // Create a new entry for this date
          journalEntry = {
            id: crypto.randomUUID(),
            date: displayDate,
            morning: null,
            evening: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            version: 1,
          };
          await db.entries.add(journalEntry);
        }
        
        setEntry(journalEntry);
      } catch (error) {
        console.error('Error loading entry:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntry();
  }, [displayDate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div
      key={displayDate} // Force re-render on date change
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <DateHeader date={displayDate} />
      
      <div className="space-y-12">
        <MorningRoutine entry={entry} />
        
        <div className="border-t border-paper-300 my-8" />
        
        <EveningRoutine entry={entry} />
      </div>
    </motion.div>
  );
}