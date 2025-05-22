type Props = {
  history: string[];
  isDarkMode: boolean;
};

export default function MoodHistory({ history, isDarkMode }: Props) {
  if (history.length === 0) return <p>No moods recorded yet.</p>;

  const theme = {
    cardBackground: isDarkMode ? "#2d2d2d" : "#f5f5f5",
    border: isDarkMode ? "#444" : "#ddd"
  };

  // Group history into blocks of 7
  const blocks = [];
  for (let i = 0; i < history.length; i += 7) {
    blocks.push(history.slice(i, i + 7));
  }

  return (
    <div>
      <h3>History:</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
        {blocks.reverse().map((block, blockIndex) => (
          <div 
            key={blockIndex}
            style={{
              padding: "0.5rem",
              backgroundColor: theme.cardBackground,
              borderRadius: "8px",
              border: `1px solid ${theme.border}`,
              fontSize: "1.5rem",
              transition: "background-color 0.3s ease, border-color 0.3s ease"
            }}
          >
            {block.map((mood, idx) => (
              <span key={idx} style={{ margin: "0.25rem" }}>
                {mood}
              </span>
            ))}
            <div style={{ fontSize: "0.7rem", marginTop: "0.25rem", opacity: 0.7 }}>
              Block {blockIndex + 1} ({block.length} mood{block.length !== 1 ? 's' : ''})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}