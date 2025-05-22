import { useEmojiMood } from "./hooks/useEmojiMood";
import EmojiPicker from "./components/EmojiPicker";
import MoodHistory from "./components/MoodHistory";
import ClearButton from "./components/ClearButton";

export default function App() {
  const { mood, history, setMood, clearHistory, streak } = useEmojiMood();

  return (
    <div
      style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}
    >
      <h1>🌈 Emoji Mood Tracker</h1>
      <EmojiPicker onSelect={setMood} />
      <h2>Current Mood: {mood || "🤔"}</h2>

      <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
        ⚡️Streak⚡️: {streak ?? 0} in a row
      </p>

      <MoodHistory history={history} />
      <ClearButton onClear={clearHistory} />
    </div>
  );
}
