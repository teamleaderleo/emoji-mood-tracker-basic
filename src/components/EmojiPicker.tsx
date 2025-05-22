import { useState } from "react";

const emojis = ["😊", "😢", "😡", "😴", "🤩", "😱"];

type Props = {
  onSelect: (emoji: string) => void;
  isDarkMode: boolean;
};

export default function EmojiPicker({ onSelect, isDarkMode }: Props) {
  const theme = {
    background: isDarkMode ? "#404040" : "#f0f0f0",
    hoverBackground: isDarkMode ? "#505050" : "#e0e0e0",
    activeBackground: isDarkMode ? "#606060" : "#d0d0d0",
    border: isDarkMode ? "#555" : "#ccc"
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <div style={{ 
        display: "flex", 
        gap: "0.5rem", 
        flexWrap: "wrap", 
        justifyContent: "center" 
      }}>
        {emojis.map((emoji) => (
          <button
            key={emoji}
            style={{ 
              fontSize: "2rem", 
              padding: "0.75rem",
              backgroundColor: theme.background,
              border: `2px solid ${theme.border}`,
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "60px",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => onSelect(emoji)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.hoverBackground;
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.background;
              e.currentTarget.style.transform = "scale(1)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = theme.activeBackground;
              e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = theme.hoverBackground;
              e.currentTarget.style.transform = "scale(1.05)";
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}