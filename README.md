# 🌈 Emoji Mood Tracker

![Current state of the app](https://github.com/user-attachments/assets/c3e946c7-24b7-45e4-adf7-4e364cb7431a)

A basic mood tracking app that focuses on meaningful emotional check-ins rather than forced daily habits. Built with React and TypeScript.

## ✨ Features

### Core Functionality
- **Emoji-based mood selection** - Six expressive emojis to capture your current state
- **Streak tracking** - See consecutive moods in a row
- **Persistent storage** - Your mood history survives page refreshes using localStorage
- **Responsive design** - Works across desktop and mobile devices

### Enhanced Features
- **📊 Mood Summary** - Visual breakdown of your emotional patterns including:
  - Total moods recorded
  - Most common mood
  - Mood variety statistics
  - Detailed breakdown by frequency

- **🌞/🌙 Theme Toggle** - Switch between light and dark modes with smooth transitions

- **Smart Clearing Options**:
  - Clear last mood entry
  - Clear block of 7 moods
  - Clear entire history

- **Pick-me-up Messages** - Contextual encouragement based on your current mood
- **Block-based History** - Moods grouped into digestible blocks of 7, displaying most recent first

## 🎯 Design Philosophy

This app intentionally avoids the "daily check-in" dark pattern common in habit-tracking apps. Instead, it encourages users to:

- Track moods when they have something meaningful to record
- Focus on emotional deltas rather than forced engagement
- View patterns without guilt or artificial streaks
- Engage naturally with their emotional journey

## 🏗️ Architecture

### Component Structure
- **useEmojiMood hook** - Centralized state management for all mood-related logic
- **Modular components** - Clean separation of concerns with reusable UI elements
- **CSS custom properties** - Theme-aware styling system for consistent theming
- **Three-column layout** - Summary, main interaction, and history sections

### Technical Highlights
- **ES2015 compatible** - Works with older TypeScript configurations
- **localStorage integration** - Automatic data persistence with error handling
- **Responsive grid system** - Adapts from 3-column desktop to single-column mobile
- **Smooth animations** - CSS transitions for theme changes and interactions

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Browser evidence

The repository includes a committed `renderprove.json` for the production Vite preview. It reviews the fresh empty state at desktop and mobile sizes after the 300 ms theme and component transitions have settled.

Prepare the locked production build:

```bash
npm run renderprove:prepare
```

Run five fresh worker reviews from a sibling Renderprove checkout in the Lima guest:

```bash
cd /home/lima/projects/renderprove
RENDERPROVE_ENROLLED_ROOT=/home/lima/projects \
  npm run probe:repeatability -- emoji-mood-tracker-basic
```

Each browser context starts with empty storage, so the initial mood, history, theme, and copy remain deterministic. Mood timestamps enter storage only after a user selects an emoji; interaction-state evidence belongs in a later named interaction case.

The GitHub workflow builds this app before starting a network-disabled, pinned Renderprove worker. It retains renderer identity, desktop and mobile screenshots, browser diagnostics, and the versioned receipt.

## 🔧 Implementation Notes

The app was built with a focus on:
- **User experience over engagement metrics** - No artificial daily streaks or guilt-inducing notifications
- **Clean, maintainable code** - Modular components with clear responsibilities
- **Accessibility** - Semantic HTML, keyboard navigation, and screen reader support
- **Performance** - Lightweight bundle with efficient state management

The mood tracking follows a "blocks of 7" approach rather than calendar-based tracking, allowing for more flexible usage patterns while still providing meaningful pattern recognition.

## 🔮 Future Enhancements

### Styling & Animation
- **Tailwind CSS integration** - Replace custom CSS with utility-first framework for faster development
- **Subtle micro-interactions** - Gentle hover states, loading animations, and celebration effects
- **Enhanced transitions** - Smooth page transitions and component state changes
- **Accessibility animations** - Respect user preferences for reduced motion

### Calendar Features
- **Calendar view** - Optional calendar interface for users who prefer date-based tracking
- **Individual day editing** - Ability to select and modify specific days or blocks
- **Date-based insights** - Weekly/monthly mood trends and patterns
- **Export functionality** - CSV/JSON export for personal data analysis

### User Experience
- **Mood notes** - Optional text notes to accompany emoji selections
- **Custom emoji sets** - Personalized mood emoji collections
- **Backup/sync** - Cloud storage integration for cross-device access
- **Mood reminders** - Optional, gentle notifications (not daily guilt trips)

### Technical Improvements
- **Comprehensive testing** - Unit tests for hooks, integration tests for components
- **Type safety** - Stricter TypeScript configuration and better type coverage
- **Performance optimization** - Code splitting and lazy loading for larger feature sets
- **PWA capabilities** - Offline support and app-like installation
