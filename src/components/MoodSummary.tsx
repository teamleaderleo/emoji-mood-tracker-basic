type MoodSummaryData = {
  totalEntries: number;
  mostCommonMood: string;
  mostCommonCount: number;
  uniqueMoods: number;
  moodCounts: Record<string, number>;
};

type Props = {
  summary: MoodSummaryData | null;
};

export default function MoodSummary({ summary }: Props) {
  if (!summary) return null;

  const { totalEntries, mostCommonMood, mostCommonCount, uniqueMoods, moodCounts } = summary;

  return (
    <div className="card">
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
                  backgroundColor: "var(--button-background)",
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