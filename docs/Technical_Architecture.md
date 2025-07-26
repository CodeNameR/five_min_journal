# Technical Architecture Document
## Five Minute Journal - Online Edition

### Overview
This document outlines the technical architecture for the Five Minute Journal MVP, focusing on a simple, performant, and maintainable solution using modern web technologies with local-first data storage.

### Technology Stack

#### Frontend
- **Framework**: React 18+ with TypeScript
  - Component-based architecture
  - Type safety
  - Great ecosystem
  - Excellent performance with React 18 features
  
- **Styling**: 
  - CSS Modules + PostCSS
  - CSS Custom Properties for theming
  - Tailwind CSS for utility classes (optional)
  
- **State Management**: 
  - React Context + useReducer for global state
  - Local component state for UI
  - Custom hooks for business logic
  
- **Build Tool**: Vite
  - Fast development experience
  - Optimized production builds
  - Native ESM support
  - Built-in TypeScript support

#### Data Layer
- **Primary Storage**: IndexedDB (via Dexie.js)
  - Structured data storage
  - 50MB+ capacity
  - Offline support
  - Better performance than localStorage
  
- **Backup Storage**: localStorage
  - Fallback for older browsers
  - Settings and preferences
  - Quick access cache

#### PWA Capabilities
- **Service Worker**: Workbox
  - Offline functionality
  - Asset caching
  - Background sync (future)
  
- **Web Manifest**: PWA configuration
  - Install prompts
  - App-like experience
  - Custom icons

### Architecture Patterns

#### Component Architecture
```
src/
├── components/
│   ├── common/          # Shared components
│   │   ├── Button/
│   │   ├── TextArea/
│   │   └── DatePicker/
│   ├── journal/         # Journal-specific components
│   │   ├── EntryForm/
│   │   ├── MorningRoutine/
│   │   ├── EveningRoutine/
│   │   └── EntryView/
│   ├── layout/          # Layout components
│   │   ├── Header/
│   │   ├── Navigation/
│   │   └── PageLayout/
│   └── ui/              # UI elements
│       ├── PaperEffect/
│       ├── LoadingState/
│       └── EmptyState/
```

#### Data Architecture
```typescript
// Core data models
interface JournalEntry {
  id: string;
  date: string; // ISO date string
  morning: MorningEntry | null;
  evening: EveningEntry | null;
  createdAt: number;
  updatedAt: number;
  version: number;
}

interface MorningEntry {
  gratitude: string[]; // Array of 3 items
  greatDay: string;
  affirmation: string;
  completedAt: number | null;
}

interface EveningEntry {
  amazingThings: string[]; // Array of 3 items
  improvements: string;
  completedAt: number | null;
}

interface UserSettings {
  theme: 'light' | 'dark' | 'sepia';
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'serif' | 'handwriting';
  enableAnimations: boolean;
  enableRuledLines: boolean;
}
```

### Data Flow Architecture

#### State Management Pattern
```typescript
// Context structure
interface AppState {
  currentEntry: JournalEntry | null;
  entries: Map<string, JournalEntry>;
  settings: UserSettings;
  ui: UIState;
}

interface UIState {
  isLoading: boolean;
  isSaving: boolean;
  currentView: 'today' | 'history' | 'settings';
  selectedDate: string;
}

// Actions
type AppAction = 
  | { type: 'SET_ENTRY'; payload: JournalEntry }
  | { type: 'UPDATE_MORNING'; payload: Partial<MorningEntry> }
  | { type: 'UPDATE_EVENING'; payload: Partial<EveningEntry> }
  | { type: 'LOAD_ENTRIES'; payload: JournalEntry[] }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<UserSettings> }
```

### Database Schema (IndexedDB)

```javascript
// Dexie schema definition
const db = new Dexie('FiveMinuteJournal');

db.version(1).stores({
  entries: 'id, date, createdAt, updatedAt',
  settings: 'id',
  drafts: 'id, date, updatedAt'
});

// Indexes:
// - id: Primary key (UUID)
// - date: For date-based queries
// - createdAt/updatedAt: For sorting
```

### API Design (Internal)

#### Data Service Layer
```typescript
interface JournalService {
  // Entry operations
  getEntry(date: string): Promise<JournalEntry | null>
  saveEntry(entry: JournalEntry): Promise<void>
  getEntries(startDate: string, endDate: string): Promise<JournalEntry[]>
  deleteEntry(id: string): Promise<void>
  
  // Settings operations
  getSettings(): Promise<UserSettings>
  updateSettings(settings: Partial<UserSettings>): Promise<void>
  
  // Export operations
  exportData(): Promise<ExportData>
  importData(data: ExportData): Promise<void>
}
```

### Routing Structure

```
/                    # Today's entry (default)
/entry/:date        # Specific date entry
/history            # Calendar/list view of entries
/settings           # User preferences
/welcome            # First-time user experience
```

### Performance Optimizations

#### Code Splitting
- Route-based splitting
- Lazy load history view
- Lazy load settings
- Dynamic imports for heavy components

#### Caching Strategy
- Service Worker caches all static assets
- IndexedDB for data persistence
- Memory cache for current session
- Aggressive caching headers for fonts

#### Bundle Optimization
- Tree shaking
- CSS purging (if using Tailwind)
- Font subsetting
- Image optimization (WebP with fallbacks)

### Security Considerations

#### Data Security
- All data stored locally (no transmission)
- Sanitize all user inputs
- XSS prevention via React
- Content Security Policy headers

#### Privacy
- No external API calls
- No analytics in MVP
- No cookies (except functional)
- Clear data export/delete options

### Development Workflow

#### Project Structure
```
five-minute-journal/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── styles/
│   └── assets/
├── public/
│   ├── fonts/
│   ├── icons/
│   └── manifest.json
├── tests/
├── docs/
└── config/
```

#### Build Pipeline
1. **Development**: `npm run dev` (Vite dev server)
2. **Testing**: `npm test` (Vitest + React Testing Library)
3. **Build**: `npm run build` (Production build)
4. **Preview**: `npm run preview` (Preview production build)
5. **Deploy**: Static hosting (Vercel/Netlify/GitHub Pages)

### Testing Strategy

#### Unit Tests
- Components: React Testing Library
- Services: Vitest
- Utils: Vitest
- Coverage target: 80%

#### Integration Tests
- User flows
- Data persistence
- PWA functionality

#### E2E Tests (Future)
- Playwright for critical paths
- Cross-browser testing

### Deployment Architecture

#### Hosting
- **Static Site Hosting**: Vercel/Netlify (recommended)
  - Automatic deployments
  - Edge network
  - HTTPS by default
  - Custom domain support

#### CI/CD Pipeline
```yaml
# GitHub Actions example
- Build and test on PR
- Deploy to staging on merge to main
- Deploy to production on tag/release
```

### Monitoring (Post-MVP)

#### Client-Side
- Error boundary reporting
- Performance metrics (Web Vitals)
- Usage analytics (privacy-focused)

#### Application Metrics
- Entry completion rates
- Feature usage
- Performance benchmarks

### Scalability Considerations

#### Future Enhancements Path
1. **Phase 1**: Current MVP (Local only)
2. **Phase 2**: Optional cloud sync
3. **Phase 3**: Multi-device sync
4. **Phase 4**: Collaboration features

#### Data Migration Strategy
- Version field in data model
- Migration scripts for updates
- Backward compatibility
- Export/import functionality

### Third-Party Dependencies

#### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "dexie": "^3.x",
  "date-fns": "^2.x",
  "workbox": "^7.x"
}
```

#### Dev Dependencies
```json
{
  "typescript": "^5.x",
  "vite": "^4.x",
  "vitest": "^0.x",
  "@testing-library/react": "^14.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x"
}
```

### Development Guidelines

#### Code Style
- ESLint + Prettier configuration
- TypeScript strict mode
- Conventional commits
- Component documentation

#### Component Guidelines
- Functional components only
- Custom hooks for logic
- Props validation with TypeScript
- Accessibility first

#### Performance Budget
- Initial load: < 100KB (gzipped)
- Time to Interactive: < 3s (3G)
- Lighthouse score: > 90
- First Contentful Paint: < 1.5s