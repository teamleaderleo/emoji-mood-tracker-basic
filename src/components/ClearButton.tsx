type Props = {
  onClearAll: () => void;
  onClearWeek: () => void;
  onClearToday: () => void;
  historyLength: number;
};

export default function ClearButton({ onClearAll, onClearWeek, onClearToday, historyLength }: Props) {
  if (historyLength === 0) {
    return null; // Don't show clear buttons if no history
  }

  return (
    <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
      <button
        onClick={onClearToday}
        style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
        title="Remove the most recent mood"
      >
        🗑️ Clear Last
      </button>
      
      {historyLength >= 2 && (
        <button
          onClick={onClearWeek}
          style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
          title="Remove the last 7 moods (or all if less than 7)"
        >
          📦 Clear Block
        </button>
      )}
      
      <button
        onClick={onClearAll}
        style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
        title="Remove all mood history"
      >
        🧹 Clear All
      </button>
    </div>
  );
}