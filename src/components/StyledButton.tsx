type Props = {
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
  isDarkMode: boolean;
};

export default function StyledButton({ onClick, children, title, isDarkMode }: Props) {
  const theme = {
    background: isDarkMode ? "#404040" : "#f0f0f0",
    hoverBackground: isDarkMode ? "#505050" : "#e0e0e0",
    text: isDarkMode ? "#ffffff" : "#333333",
    border: isDarkMode ? "#555" : "#ccc"
  };

  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        padding: "0.5rem 1rem",
        fontSize: "0.9rem",
        backgroundColor: theme.background,
        color: theme.text,
        border: `1px solid ${theme.border}`,
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.hoverBackground;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.background;
      }}
    >
      {children}
    </button>
  );
}