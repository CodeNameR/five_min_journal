import { Link, useLocation } from 'react-router-dom';
import { Calendar, Home, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const location = useLocation();

  const links = [
    { href: '/', icon: Home, label: 'Today' },
    { href: '/history', icon: Calendar, label: 'History' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-8 right-8 z-20">
        <div className="flex gap-2 bg-paper-50/90 backdrop-blur-sm rounded-full shadow-paper p-2">
          {links.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full',
                'text-ink-secondary hover:text-ink-primary hover:bg-paper-200/50 transition-all',
                location.pathname === href && 'text-ink-primary bg-paper-200'
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-serif">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-paper-100 border-t border-paper-300 md:hidden">
        <div className="flex justify-around items-center h-16">
          {links.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full',
                'text-ink-secondary hover:text-ink-primary transition-colors',
                location.pathname === href && 'text-ink-primary'
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}