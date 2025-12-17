import React from "react";
import CategoryButtons from "./CategoryButtons";
import "../../App.css";
import StartButton from "./StartButton";

export default function Welcome({ onStart, onCategorySelect, selectedCategory }) {
  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow"
        style={{
          background: "linear-gradient(135deg, #366c44ff, #111827)",
          color: "white",
          borderRadius: "18px",
          border: "1px solid #374151",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, paddingRight: "20px" }}>
            <h2 className="welcome-animated mb-3">
              Welcome to Islamic Knowledge Quiz
            </h2>
            <p style={{ fontSize: "16px", opacity: 0.85 }}>
              Test your knowledge about Islam in different categories.
            </p>

            <CategoryButtons
              selectedCategory={selectedCategory}
              onCategorySelect={onCategorySelect}
            />

            <div className="mt-3">
              <StartButton
                onStart={onStart}   // ✅ start quiz directly
                disabled={!selectedCategory}
              />
            </div>
          </div>

          <div>
            <img
              src="/images/myphoto.png"
              alt="Islam quiz"
              style={{
                width: "260px",
                height: "260px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
