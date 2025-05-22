type Props = {
  isDarkMode: boolean;
  onToggle: () => void;
};

export default function ThemeToggle({ isDarkMode, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: "none",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
        padding: "0.5rem",
        borderRadius: "8px",
        transition: "background-color 0.2s ease"
      }}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isDarkMode ? "#404040" : "#f0f0f0";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
}