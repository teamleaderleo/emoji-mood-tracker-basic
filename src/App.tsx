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
        padding: "2rem", 
        fontFamily: "sans-serif", 
        textAlign: "center",
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div></div>
        <h1 style={{ margin: 0 }}>🌈 Emoji Mood Tracker</h1>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      <EmojiPicker onSelect={setMood} />
      <h2>Current Mood: {mood || "🤔"}</h2>

      <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
        ⚡️Streak⚡️: {streak ?? 0} in a row
      </p>

      {/* Pick-me-up message */}
      <div style={{
        margin: "1rem 0",
        padding: "0.75rem",
        backgroundColor: currentTheme.cardBackground,
        borderRadius: "8px",
        border: `1px solid ${currentTheme.border}`,
        fontStyle: "italic",
        fontSize: "0.9rem"
      }}>
        💭 {pickMeUpMessage}
      </div>

      <MoodHistory history={history} />
      <MoodSummary summary={moodSummary} isDarkMode={isDarkMode} />
      <ClearButton 
        onClearAll={clearHistory}
        onClearWeek={clearLastWeek}
        onClearToday={clearToday}
        historyLength={history.length}
      />
    </div>
  );
}