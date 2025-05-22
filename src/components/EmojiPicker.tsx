import { useState } from "react";

const emojis = ["😊", "😢", "😡", "😴", "🤩", "😱"];

type Props = {
  onSelect: (emoji: string) => void;
};

export default function EmojiPicker({ onSelect }: Props) {
  // const [mood, setMoodState] = useState<string | null>(null);
  return (
    <div style={{ margin: "1rem 0" }}>
      {emojis.map((emoji) => (
        <button
          key={emoji}
          style={{ fontSize: "2rem", margin: "0.5rem" }}
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
