type Props = {
  history: string[];
};

export default function MoodHistory({ history }: Props) {
  if (history.length === 0) return <p>No moods recorded yet.</p>;

  return (
    <div>
      <h3>History:</h3>
      <div style={{ fontSize: "1.5rem" }}>
        {history.map((mood, idx) => (
          <span key={idx} style={{ margin: "0.25rem" }}>
            {mood}
          </span>
        ))}
      </div>
    </div>
  );
}
