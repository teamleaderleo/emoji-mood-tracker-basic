import { useState } from "react";

const emojis = ["😊", "😢", "😡", "😴", "🤩", "😱"];

type Props = {
  onSelect: (emoji: string) => void;
};

export default function EmojiPicker({ onSelect }: Props) {
  return (
    <div className="emoji-grid">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          className="emoji-button"
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}