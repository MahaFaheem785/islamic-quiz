export default function StartButton({ onStart, disabled }) {
  return (
    <button
      onClick={onStart}
      disabled={disabled} // <-- use the prop here
      style={{
        padding: "10px 20px",
        fontSize: "18px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: disabled ? "#9ca3af" : "#f59e0b",
        color: "white",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "0.3s",
      }}
    >
      Start Quiz
    </button>
  );
}
