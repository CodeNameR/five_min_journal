import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-paper-100 to-paper-200">
      {/* Paper texture overlay */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-paper-texture" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container max-w-4xl mx-auto px-4 py-8 md:py-12"
        >
          <div className="bg-paper-50 rounded-sm shadow-paper-stack p-8 md:p-12 relative overflow-hidden">
            {/* Paper fold effect */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-paper-200 to-paper-300 transform rotate-45 translate-x-8 -translate-y-8" />
            
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </motion.main>
        
        <Navigation />
      </div>
    </div>
  );
}