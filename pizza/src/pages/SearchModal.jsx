import React, { useState } from "react";
import "./SearchModal.css";

function SearchModal() {
  const [search, setSearch] = useState("Чиз");

  const pizzas = [
    {
      id: 1,
      name: "Чизбургер-пицца",
      price: "179₽",
      image:
        "https://cdn-icons-png.flaticon.com/512/6978/6978255.png",
    },
    {
      id: 2,
      name: "Острая пицца-чизбургер",
      price: "299₽",
      image:
        "https://cdn-icons-png.flaticon.com/512/6978/6978255.png",
    },
  ];

  const filtered = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-overlay">
      <div className="search-modal">
        {/* Поиск */}
        <div className="search-input-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Поиск пиццы..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="close-btn"
            onClick={() => setSearch("")}
          >
            ✕
          </button>
        </div>

        {/* Список */}
        <div className="search-results">
          {filtered.map((pizza) => (
            <div className="search-item" key={pizza.id}>
              <img src={pizza.image} alt={pizza.name} />

              <div className="search-info">
                <h4>{pizza.name}</h4>
                <span>{pizza.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;