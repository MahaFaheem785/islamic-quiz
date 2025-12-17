import { useState, useEffect } from "react";
import questionBank from "./questionBank";

function ProgressCircle({ current, total }) {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = current / total;
  const offset = circumference - progress * circumference;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1b5e20, #2e7d32)",
        borderRadius: "20px",
        padding: "20px",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="position-relative d-inline-block">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="rgba(255,255,255,0.3)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#ffffff"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "0.4s" }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 700,
            fontSize: "1.2rem",
          }}
        >
          {current}/{total}
        </div>
      </div>
      <div className="mt-2" style={{ fontSize: "0.9rem" }}>
        {Math.round(progress * 100)}% Completed
      </div>
    </div>
  );
}

export default function QuizEngine({ category, onExit }) {
  const questions = questionBank[category] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [timeUp, setTimeUp] = useState(false);

  if (!category) return <h4 className="text-center mt-5">Select a category</h4>;

  const current = questions[currentIndex];

  useEffect(() => {
    if (showResult || showFeedback) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setTimeUp(true);
          setShowFeedback(true);
          return 0;
        } else return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showResult, showFeedback]);

  const handleSelect = (idx) => {
    if (!showFeedback && !timeUp) {
      setSelected(idx);
      setShowFeedback(true);
      const copy = [...answers];
      copy[currentIndex] = idx;
      setAnswers(copy);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    setTimeUp(false);
    setTimer(10);
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else setShowResult(true);
  };

  if (showResult) {
    const score = answers.filter((a, i) => a === questions[i].correct).length;
    return (
      <div className="container mt-5 text-center">
        <h2>🎉 Quiz Completed</h2>
        <p className="fs-5">
          Score: <strong>{score}</strong> / {questions.length}
        </p>
        <button
          className="btn btn-success px-4"
          onClick={() => onExit(score)}
        >
          Result
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "24px" }}>
      <div style={{ background: "white", borderRadius: "24px", padding: "30px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
        <h6 style={{ fontWeight: 600, marginBottom: "6px", color: timer <= 3 ? "#c62828" : "#2e7d32" }}>
          ⏱ Time left: {timer}s
        </h6>
        <div style={{ height: "10px", width: "100%", background: "#e0e0e0", borderRadius: "10px", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ height: "100%", width: `${(timer / 10) * 100}%`, background: timer <= 3 ? "#c62828" : "#2e7d32", transition: "width 1s linear" }}></div>
        </div>

        <h5 className="mb-4 fw-bold">{current.question}</h5>

        <div className="d-flex flex-column gap-3">
          {current.options.map((opt, idx) => {
            let bg = "#f8f9fa", color = "#212529";
            if (showFeedback) {
              if (idx === current.correct) { bg = "#2e7d32"; color = "white"; }
              else if (idx === selected && idx !== current.correct) { bg = "#c62828"; color = "white"; }
            } else if (selected === idx) bg = "#e8f5e9";

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showFeedback || timeUp}
                style={{ padding: "14px 18px", borderRadius: "14px", border: "none", textAlign: "left", background: bg, color, fontWeight: 500, transition: "0.2s", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {showFeedback && selected !== current.correct && (
          <p className="mt-3 text-danger">❌ Wrong! {current.explanation}</p>
        )}
        {showFeedback && (selected === current.correct || timeUp) && (
          <p className="mt-3 text-success">✅ Correct Answer: {current.options[current.correct]}</p>
        )}

        {showFeedback && (
          <button className="btn btn-success mt-4 px-5" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? "Next" : "Finish"}
          </button>
        )}
      </div>

      <div>
        <ProgressCircle current={answers.filter((a) => a !== null).length} total={questions.length} />

        <div className="mt-4" style={{ background: "white", borderRadius: "18px", padding: "16px", boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}>
          <h6 className="fw-bold mb-3">Questions</h6>
          <div className="d-flex flex-wrap gap-2">
            {questions.map((_, i) => (
              <div key={i} onClick={() => setCurrentIndex(i)}
                   style={{ width: "38px", height: "38px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: 600,
                     background: i === currentIndex ? "#1b5e20" : answers[i] !== null ? "#a5d6a7" : "#f1f3f5",
                     color: i === currentIndex ? "white" : "#212529" }}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
