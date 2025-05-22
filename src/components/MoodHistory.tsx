type Props = {
  history: string[];
};

export default function MoodHistory({ history }: Props) {
  if (history.length === 0) return <p>No moods recorded yet.</p>;

  // Group history into blocks of 7
  const blocks = [];
  for (let i = 0; i < history.length; i += 7) {
    blocks.push(history.slice(i, i + 7));
  }

  return (
    <div>
      <h3>History:</h3>
      <div className="history-blocks">
        {blocks.reverse().map((block, blockIndex) => (
          <div 
            key={blockIndex}
            className="card"
            style={{ fontSize: "1.5rem" }}
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