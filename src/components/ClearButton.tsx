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
    <div className="button-group">
      <button
        onClick={onClearToday}
        className="button"
        title="Remove the most recent mood"
      >
        🗑️ Clear Last
      </button>
      
      {historyLength >= 2 && (
        <button
          onClick={onClearWeek}
          className="button"
          title="Remove the last 7 moods (or all if less than 7)"
        >
          📦 Clear Block
        </button>
      )}
      
      <button
        onClick={onClearAll}
        className="button"
        title="Remove all mood history"
      >
        🧹 Clear All
      </button>
    </div>
  );
}