# User Design Specification
## Five Minute Journal - Online Edition

### Design Philosophy
The design should evoke the feeling of writing in a physical journal while leveraging digital conveniences. Every design decision should support mindfulness, simplicity, and the ritual of daily reflection.

### Visual Design System

#### Color Palette
- **Primary Background**: #FAF8F3 (Warm off-white, paper-like)
- **Secondary Background**: #F5F2ED (Slightly darker for contrast areas)
- **Text Primary**: #2C2825 (Soft black for main content)
- **Text Secondary**: #6B645F (Muted brown for labels/hints)
- **Accent**: #8B7355 (Warm brown for interactive elements)
- **Border/Lines**: #E8E5E0 (Subtle lines mimicking ruled paper)
- **Success**: #7B8F7B (Muted green for completed states)

#### Typography
- **Headings**: "Crimson Text" or "Playfair Display" (serif, elegant)
- **Body Text**: "Source Serif Pro" or "Lora" (readable serif)
- **User Input**: "Amatic SC" or "Kalam" (handwriting-style font)
- **UI Elements**: "Inter" or system fonts (clean, modern)

**Font Sizes**:
- Page Title: 32px
- Section Headers: 24px
- Prompts: 18px
- User Input: 20px
- Navigation: 16px
- Metadata: 14px

#### Layout & Spacing
- Maximum content width: 720px (centered)
- Page padding: 48px (desktop), 24px (tablet), 16px (mobile)
- Section spacing: 48px between major sections
- Line height: 1.8 for optimal readability
- Input field padding: 16px

### Component Design

#### 1. Page Structure
```
+----------------------------------+
|          Date Header             |
|         [April 21, 2024]         |
+----------------------------------+
|                                  |
|        Morning Reflection        |
|        ~~~~~~~~~~~~~~~~         |
|                                  |
|     [Gratitude Section]          |
|     [Great Day Section]          |
|     [Affirmation Section]        |
|                                  |
+----------------------------------+
|                                  |
|        Evening Reflection        |
|        ~~~~~~~~~~~~~~~~         |
|                                  |
|     [Amazing Things Section]     |
|     [Improvements Section]       |
|                                  |
+----------------------------------+
|         [Navigation Bar]         |
+----------------------------------+
```

#### 2. Input Components

**Text Areas**:
- Border: none (rely on background color change)
- Background: Slightly lighter on focus (#FFFFFE)
- Auto-expanding height
- Subtle shadow on focus (0 2px 8px rgba(0,0,0,0.08))
- Placeholder text in italic, lighter color
- Smooth transitions (0.2s ease)

**Visual Feedback**:
- Gentle fade-in animations (0.3s)
- Soft hover states (+5% darkness)
- No harsh borders or sharp corners
- Completion checkmark appears with fade

#### 3. Navigation Design

**Calendar View**:
- Minimal month view
- Dots under dates with entries
- Different colors for partial vs complete entries
- Smooth slide transitions between months

**Quick Access**:
- "Today" button always visible
- Recent entries (last 7 days) quick links
- Subtle breadcrumb navigation

#### 4. Paper Effects

**Background Texture**:
- Subtle paper texture overlay (low opacity)
- Slight vignette effect at edges
- Optional ruled lines (faint horizontal guides)

**Page Effects**:
- Soft drop shadow (0 4px 20px rgba(0,0,0,0.08))
- Slight page curl effect on corners (CSS)
- Optional coffee stain watermark (fun detail)

### Responsive Breakpoints

#### Desktop (1024px+)
- Full layout with generous spacing
- Side margins for paper effect
- Hover interactions enabled
- Multi-column layout for past entries view

#### Tablet (768px - 1023px)
- Slightly reduced spacing
- Full-width layout
- Touch-optimized tap targets (44px minimum)
- Single column for all views

#### Mobile (< 768px)
- Compact layout
- Stacked sections
- Larger touch targets
- Simplified navigation
- Bottom navigation bar
- Full-screen entry mode

### Interaction Design

#### Micro-interactions
- Gentle ease-in-out transitions (0.2-0.3s)
- Subtle scale on button press (0.98)
- Smooth scroll behavior
- Auto-save indicator (pulsing dot)
- Success feedback (gentle checkmark animation)

#### User Flows

**New User Flow**:
1. Welcome screen with brief explanation
2. Sample entry demonstration
3. Direct to today's entry
4. Gentle prompts for each section

**Returning User Flow**:
1. Open to today's entry
2. Visual indicator if morning/evening incomplete
3. Quick access to recent entries
4. Subtle reminder if streak broken

**Entry Creation Flow**:
1. Focus on first prompt
2. Tab/Enter to next field
3. Auto-save after each field
4. Visual progress indication
5. Completion celebration (subtle)

### Accessibility Considerations

#### Visual
- High contrast mode option
- Adjustable font size controls
- Clear focus indicators
- No color-only information

#### Interaction
- Full keyboard navigation
- Clear tab order
- Skip links for screen readers
- ARIA labels for all inputs
- Descriptive button text

#### Motion
- Respect prefers-reduced-motion
- Option to disable animations
- No auto-playing content
- Smooth but not disorienting transitions

### Mobile-Specific Considerations

#### Touch Interactions
- Swipe between days
- Pull-to-refresh for sync (future)
- Long-press for entry options
- Pinch to zoom text

#### Mobile Navigation
- Fixed bottom nav bar
- Today, History, Settings
- Minimal and unobtrusive
- Gesture-based navigation

### Loading & Empty States

#### Loading States
- Skeleton screens matching layout
- Gentle pulse animation
- No spinners (maintain calm aesthetic)

#### Empty States
- Encouraging messages
- Beautiful illustrations (journal-themed)
- Clear call-to-action
- Sample prompt suggestions

### Error Handling

#### Visual Error States
- Inline validation messages
- Soft red color (#D4756C)
- Icon + helpful message
- Recovery suggestions

#### Storage Errors
- Clear messaging about storage limits
- Export prompts before data loss
- Graceful degradation

### Special States

#### Completion State
- Subtle confetti or star animation
- Encouraging message
- Streak counter (future)
- Share option (future)

#### Archive View
- Grid or list toggle
- Month/year grouping
- Search functionality
- Visual entry previews

### Design Assets Needed

1. **Icons** (minimal, line-style):
   - Calendar
   - Check mark
   - Arrow left/right
   - Sun (morning)
   - Moon (evening)
   - Export
   - Settings

2. **Illustrations**:
   - Empty state journal
   - Welcome screen graphic
   - Achievement badges (future)

3. **Textures**:
   - Paper texture (subtle)
   - Optional ruled lines
   - Watermark effects

### Implementation Notes

- Use CSS custom properties for theming
- Implement smooth transitions via CSS
- Optimize font loading (font-display: swap)
- Use CSS Grid for layout flexibility
- Implement progressive enhancement
- Consider CSS-only animations where possible
- Use system fonts as fallbacks
- Implement lazy loading for history view