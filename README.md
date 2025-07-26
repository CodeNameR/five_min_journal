# Five Minute Journal - Online Edition

A beautiful, paper-like digital version of the Five Minute Journal built with React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

The app is already running! Visit [http://localhost:5173/](http://localhost:5173/) to see your journal.

## ✨ Features Implemented

### Core Functionality
- ✅ **Morning Routine**: 3 gratitudes, daily intention, affirmation
- ✅ **Evening Routine**: 3 amazing things, reflection on improvements
- ✅ **Auto-save**: All entries save automatically as you type
- ✅ **Local Storage**: Data stored privately in IndexedDB
- ✅ **Responsive Design**: Works beautifully on desktop and mobile

### Paper-Like Design
- 📜 Warm, paper-inspired color palette
- ✍️ Handwriting font for user input (Kalam)
- 📑 Stacked paper shadow effects
- 📐 Optional ruled lines (can be enabled in settings)
- 🎨 Subtle paper texture background
- ✨ Smooth animations with Framer Motion

### Technical Stack
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **IndexedDB** (via Dexie) for data storage
- **shadcn/ui** components (Radix UI base)
- **React Router** for navigation

## 📱 Using the App

1. **Today's Entry**: Opens by default, shows current date
2. **Morning Reflection**: Complete in the morning
   - Write 3 things you're grateful for
   - Set your intention for the day
   - Write a positive affirmation
3. **Evening Reflection**: Complete before bed
   - Record 3 amazing things that happened
   - Reflect on how to improve tomorrow

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── journal/     # Journal-specific components
│   ├── layout/      # Layout components
│   └── ui/          # Generic UI components
├── contexts/        # React contexts
├── pages/           # Page components
├── services/        # Database and API services
├── types/           # TypeScript type definitions
└── lib/             # Utility functions
```

## 🎨 Customization

The design system is built with Tailwind CSS custom theme:
- **Colors**: Paper-inspired palette in `tailwind.config.js`
- **Fonts**: Google Fonts (Crimson Text, Kalam, Playfair Display)
- **Effects**: Custom CSS in `src/index.css`

## 🔄 Next Steps

The following features are prepared but not yet implemented:
- [ ] History page with calendar view
- [ ] Settings page with theme options
- [ ] Export/import functionality
- [ ] PWA offline support
- [ ] Habit tracking/streaks
- [ ] Search functionality

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers

## 📝 License

Private project - all rights reserved