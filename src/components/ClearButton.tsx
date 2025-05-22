import StyledButton from "./StyledButton";

type Props = {
  onClearAll: () => void;
  onClearWeek: () => void;
  onClearToday: () => void;
  historyLength: number;
  isDarkMode: boolean;
};

export default function ClearButton({ onClearAll, onClearWeek, onClearToday, historyLength, isDarkMode }: Props) {
  if (historyLength === 0) {
    return null; // Don't show clear buttons if no history
  }

  return (
    <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
      <StyledButton
        onClick={onClearToday}
        title="Remove the most recent mood"
        isDarkMode={isDarkMode}
      >
        🗑️ Clear Last
      </StyledButton>
      
      {historyLength >= 2 && (
        <StyledButton
          onClick={onClearWeek}
          title="Remove the last 7 moods (or all if less than 7)"
          isDarkMode={isDarkMode}
        >
          📦 Clear Block
        </StyledButton>
      )}
      
      <StyledButton
        onClick={onClearAll}
        title="Remove all mood history"
        isDarkMode={isDarkMode}
      >
        🧹 Clear All
      </StyledButton>
    </div>
  );
}