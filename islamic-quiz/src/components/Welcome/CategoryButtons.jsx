const categories = [
  { id: "pillars", label: "Pillars of Islam" },
  { id: "prophets", label: "Prophets in Islam" },
  { id: "quran", label: "Quran Knowledge" },
  { id: "prayer", label: "Prayer Knowledge" }
];

export default function CategoryButtons({ selectedCategory, onCategorySelect }) {
  return (
    <div className="my-3">
      <h5 className="mb-3">Select Category</h5>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",          // ✅ wrap on small screens
          gap: "10px",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            style={{
              backgroundColor:
                selectedCategory === cat.id ? "#c4c422ff" : "white",
              color:
                selectedCategory === cat.id ? "white" : "#2e7d32",
              border: "2px solid #2e7d32",
              borderRadius: "30px",
              padding: "10px 18px",     // ✅ better touch size
              fontWeight: "500",
              transition: "0.2s",
              whiteSpace: "nowrap",     // ✅ no broken text
              flex: "1 1 auto",         // ✅ responsive width
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
