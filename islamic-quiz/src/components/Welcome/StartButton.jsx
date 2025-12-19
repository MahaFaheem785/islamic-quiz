export default function StartButton({ onStart, disabled }) {
  return (
    <button
      onClick={onStart}
      disabled={disabled}
      style={{
        padding: "12px 24px",        // ✅ better tap size
        fontSize: "clamp(16px, 4vw, 18px)", // ✅ responsive text
        borderRadius: "10px",
        border: "none",
        backgroundColor: disabled ? "#9ca3af" : "#f59e0b",
        color: "white",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "0.3s",
        width: "100%",               // ✅ full width on mobile
        maxWidth: "260px",           // ✅ normal on desktop
      }}
    >
      Start Quiz
    </button>
  );
}
