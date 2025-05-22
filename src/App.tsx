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

  const theme = {
    light: {
      background: "#ffffff",
      text: "#333333",
      cardBackground: "#f5f5f5",
      border: "#ddd"
    },
    dark: {
      background: "#1a1a1a",
      text: "#ffffff",
      cardBackground: "#2d2d2d",
      border: "#444"
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div
      style={{ 
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header */}
      <div style={{ 
        padding: "1rem 2rem",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: `1px solid ${currentTheme.border}`
      }}>
        <div></div>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>🌈 Emoji Mood Tracker</h1>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      {/* Main 3-column layout */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "2rem",
        padding: "2rem",
        alignItems: "start" // Keep items aligned to top
      }}>
        
        {/* Left Column - Mood Summary */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column"
        }}>
          <MoodSummary summary={moodSummary} isDarkMode={isDarkMode} />
        </div>

        {/* Center Column - Main interaction - ALWAYS CENTERED */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "1rem",
          minHeight: "calc(100vh - 200px)", // Take full available height
          position: "sticky",
          top: 0
        }}>
          <EmojiPicker onSelect={setMood} />
          <h2 style={{ margin: "0.5rem 0", fontSize: "1.8rem" }}>Current Mood: {mood || "🤔"}</h2>

          <p style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>
            ⚡️Streak⚡️: {streak ?? 0} in a row
          </p>

          {/* Pick-me-up message */}
          <div style={{
            padding: "1rem",
            backgroundColor: currentTheme.cardBackground,
            borderRadius: "12px",
            border: `1px solid ${currentTheme.border}`,
            fontStyle: "italic",
            fontSize: "1rem",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
            maxWidth: "400px"
          }}>
            💭 {pickMeUpMessage}
          </div>

          <ClearButton 
            onClearAll={clearHistory}
            onClearWeek={clearLastWeek}
            onClearToday={clearToday}
            historyLength={history.length}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Right Column - History */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column"
        }}>
          <MoodHistory history={history} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}