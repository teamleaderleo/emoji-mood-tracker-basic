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

## 🔧 Implementation Notes

The app was built with a focus on:
- **User experience over engagement metrics** - No artificial daily streaks or guilt-inducing notifications
- **Clean, maintainable code** - Modular components with clear responsibilities
- **Accessibility** - Semantic HTML, keyboard navigation, and screen reader support
- **Performance** - Lightweight bundle with efficient state management

The mood tracking follows a "blocks of 7" approach rather than calendar-based tracking, allowing for more flexible usage patterns while still providing meaningful pattern recognition.