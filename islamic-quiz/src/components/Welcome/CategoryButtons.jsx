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

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategorySelect(cat.id)}
          className="me-2 mb-2"
          style={{
            backgroundColor: selectedCategory === cat.id ? "#c4c422ff" : "white",
            color: selectedCategory === cat.id ? "white" : "#2e7d32",
            border: "2px solid #2e7d32",
            borderRadius: "30px",
            padding: "8px 18px",
            fontWeight: "500",
            transition: "0.2s",
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
