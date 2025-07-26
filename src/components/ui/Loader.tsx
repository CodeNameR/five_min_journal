import { motion } from 'framer-motion';

export function Loader() {
  return (
    <div className="flex items-center justify-center h-64">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-paper-400 border-t-transparent rounded-full"
          />
          <span className="text-ink-secondary font-serif italic">Loading your journal...</span>
        </div>
      </motion.div>
    </div>
  );
}