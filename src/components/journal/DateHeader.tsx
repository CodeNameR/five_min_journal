import { format, parseISO, addDays, subDays } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DateHeaderProps {
  date: string;
}

export function DateHeader({ date }: DateHeaderProps) {
  const navigate = useNavigate();
  const parsedDate = parseISO(date);
  const isToday = format(new Date(), 'yyyy-MM-dd') === date;

  const goToPreviousDay = () => {
    const prevDate = format(subDays(parsedDate, 1), 'yyyy-MM-dd');
    navigate(`/entry/${prevDate}`);
  };

  const goToNextDay = () => {
    const nextDate = format(addDays(parsedDate, 1), 'yyyy-MM-dd');
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Don't allow going to future dates
    if (nextDate > today) return;
    
    if (nextDate === today) {
      navigate('/');
    } else {
      navigate(`/entry/${nextDate}`);
    }
  };

  const goToToday = () => {
    navigate('/');
  };

  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
  const canGoNext = date < format(new Date(), 'yyyy-MM-dd');

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      {/* Date Navigation */}
      <div className="flex items-center justify-between max-w-md mx-auto">
        <button
          onClick={goToPreviousDay}
          className="p-2 rounded-full hover:bg-paper-200 transition-colors"
          aria-label="Previous day"
        >
          <ChevronLeft className="w-5 h-5 text-ink-secondary" />
        </button>

        <div className="text-center">
          <h1 className="font-display text-3xl md:text-4xl text-ink-primary">
            {isToday ? 'Today' : format(parsedDate, 'EEEE')}
          </h1>
          <p className="text-ink-secondary font-serif text-lg">
            {format(parsedDate, 'MMMM d, yyyy')}
          </p>
        </div>

        <button
          onClick={goToNextDay}
          disabled={!canGoNext}
          className={`p-2 rounded-full transition-colors ${
            canGoNext 
              ? 'hover:bg-paper-200' 
              : 'opacity-30 cursor-not-allowed'
          }`}
          aria-label="Next day"
        >
          <ChevronRight className="w-5 h-5 text-ink-secondary" />
        </button>
      </div>

      {/* Today button if not on today */}
      {!isToday && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={goToToday}
            className="text-sm text-ink-secondary hover:text-ink-primary transition-colors font-serif italic"
          >
            ← Back to today
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}