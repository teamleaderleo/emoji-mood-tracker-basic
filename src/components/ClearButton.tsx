type Props = {
  onClear: () => void;
};

export default function ClearButton({ onClear }: Props) {
  return (
    <button
      onClick={onClear}
      style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
    >
      🧹 Clear Mood History
    </button>
  );
}
