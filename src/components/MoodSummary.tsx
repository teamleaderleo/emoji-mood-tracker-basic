type MoodSummaryData = {
  totalEntries: number;
  mostCommonMood: string;
  mostCommonCount: number;
  uniqueMoods: number;
  moodCounts: Record<string, number>;
};

type Props = {
  summary: MoodSummaryData | null;
  isDarkMode: boolean;
};

export default function MoodSummary({ summary, isDarkMode }: Props) {
  if (!summary) return null;

  const { totalEntries, mostCommonMood, mostCommonCount, uniqueMoods, moodCounts } = summary;

  const theme = {
    cardBackground: isDarkMode ? "#2d2d2d" : "#f5f5f5",
    border: isDarkMode ? "#444" : "#ddd",
    chipBackground: isDarkMode ? "#404040" : "#fff"
  };

  return (
    <div style={{ 
      margin: "1rem 0", 
      padding: "1rem", 
      backgroundColor: theme.cardBackground, 
      borderRadius: "8px",
      border: `1px solid ${theme.border}`,
      transition: "background-color 0.3s ease, border-color 0.3s ease"
    }}>
      <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>📊 Mood Summary</h3>
      
      <div style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
        <p style={{ margin: "0.25rem 0" }}>
          <strong>Total moods recorded:</strong> {totalEntries}
        </p>
        
        <p style={{ margin: "0.25rem 0" }}>
          <strong>Most common mood:</strong> {mostCommonMood} ({mostCommonCount} times)
        </p>
        
        <p style={{ margin: "0.25rem 0" }}>
          <strong>Mood variety:</strong> {uniqueMoods} different emotions
        </p>

        {/* Show all mood counts */}
        <div style={{ marginTop: "0.5rem" }}>
          <strong>Breakdown:</strong>
          <div style={{ marginTop: "0.25rem" }}>
            {Object.keys(moodCounts)
              .sort((a, b) => moodCounts[b] - moodCounts[a])
              .map((mood) => (
                <span key={mood} style={{ 
                  display: "inline-block", 
                  margin: "0.125rem 0.25rem",
                  padding: "0.125rem 0.25rem",
                  backgroundColor: theme.chipBackground,
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  transition: "background-color 0.3s ease"
                }}>
                  {mood} ×{moodCounts[mood]}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}