import React from "react";
import "./styles.css";
import { useEmojiMood } from "./hooks/useEmojiMood";
import EmojiPicker from "./components/EmojiPicker";
import MoodHistory from "./components/MoodHistory";
import MoodSummary from "./components/MoodSummary";
import ClearButton from "./components/ClearButton";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const { 
    mood, 
    history, 
    setMood, 
    clearHistory, 
    clearLastWeek, 
    clearToday, 
    streak, 
    moodSummary,
    pickMeUpMessage,
    isDarkMode,
    toggleTheme
  } = useEmojiMood();

  // Set theme on document root
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div></div>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>🌈 Emoji Mood Tracker</h1>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      {/* Main 3-column layout */}
      <div className="main-grid">
        
        {/* Left Column - Mood Summary */}
        <div>
          <MoodSummary summary={moodSummary} />
        </div>

        {/* Center Column - Main interaction */}
        <div className="center-column">
          <EmojiPicker onSelect={setMood} />
          <h2 style={{ 
            margin: "0.5rem 0", 
            fontSize: "clamp(1.2rem, 4vw, 1.8rem)" 
          }}>
            Current Mood: {mood || "🤔"}
          </h2>

          <p style={{ 
            fontSize: "clamp(0.9rem, 3vw, 1.1rem)", 
            margin: "0.5rem 0" 
          }}>
            ⚡️Streak⚡️: {streak ?? 0} in a row
          </p>

          {/* Pick-me-up message */}
          <div className="card card-large" style={{
            fontStyle: "italic",
            fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            maxWidth: "min(400px, 90%)",
            width: "100%"
          }}>
            💭 {pickMeUpMessage}
          </div>

          <ClearButton 
            onClearAll={clearHistory}
            onClearWeek={clearLastWeek}
            onClearToday={clearToday}
            historyLength={history.length}
          />
        </div>

        {/* Right Column - History */}
        <div>
          <MoodHistory history={history} />
        </div>
      </div>
    </div>
  );
}