import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TextAreaInput({ value, onChange, placeholder, className }: TextAreaInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <motion.div
      whileFocus={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="relative"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'journal-input handwriting text-lg leading-relaxed',
          'transition-all duration-200',
          className
        )}
        rows={1}
      />
    </motion.div>
  );
}