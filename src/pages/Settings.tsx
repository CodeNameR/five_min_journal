import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-6 h-6 text-paper-600" />
        <h1 className="font-display text-3xl text-ink-primary">Settings</h1>
      </div>
      
      <div className="text-center py-12">
        <p className="text-ink-secondary font-serif italic">
          Customization options coming soon
        </p>
      </div>
    </motion.div>
  );
}