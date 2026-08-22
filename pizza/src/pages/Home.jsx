import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

const API_BASE_URL = "https://pizza-api-pj4j.onrender.com";
const API_URL = `${API_BASE_URL}/api/v1/pizzas`;

const CATEGORIES = [
  { label: "Все", key: "all" },
  { label: "Мясные", key: "isMeat" },
  { label: "Острые", key: "isSpicy" },
  { label: "Сладкие", key: "isSweet" },
  { label: "Вегетарианские", key: "isVegetarian" },
  { label: "С курицей", key: "isChicken" },
];

// Вспомогательная функция для корректной проверки boolean-флагов из бэкенда
const isTrue = (val) => val === true || val === "true" || val === 1 || val === "1";

function Home() {
  const [allPizzas, setAllPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartCounts, setCartCounts] = useState({});

  // Состояния фильтров
  const [activeCategory, setActiveCategory] = useState("all");
  const [canCustomise, setCanCustomise] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [doughType, setDoughType] = useState("");

  // Ингредиенты (Boolean)
  const [ingredients, setIngredients] = useState({
    hasCheeseSauce: false,
    hasMozzarella: false,
    hasGarlic: false,
    hasPickles: false,
    hasRedOnion: false,
    hasTomatoes: false,
  });

  // 1. Загрузка данных с бэкенда
  const fetchPizzas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setAllPizzas(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке пицц:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  // 2. Автоматическая фильтрация при изменении любого состояния
  useEffect(() => {
    let result = [...allPizzas];

    // Фильтр по верхней категории (isMeat, isSpicy, etc.)
    if (activeCategory !== "all") {
      result = result.filter((item) => isTrue(item[activeCategory]));
    }

    // Фильтр: Можно собирать
    if (canCustomise) {
      result = result.filter((item) => isTrue(item.canCustomise));
    }

    // Фильтр: Новинки
    if (isNew) {
      result = result.filter((item) => isTrue(item.isNew));
    }

    // Фильтр по цене
    if (priceFrom !== "") {
      result = result.filter((item) => Number(item.price) >= Number(priceFrom));
    }
    if (priceTo !== "") {
      result = result.filter((item) => Number(item.price) <= Number(priceTo));
    }

    // Фильтр по ингредиентам
    Object.keys(ingredients).forEach((key) => {
      if (ingredients[key]) {
        result = result.filter((item) => isTrue(item[key]));
      }
    });

    // Фильтр по типу теста
    if (doughType) {
      result = result.filter((item) => item.doughType === doughType);
    }

    setFilteredPizzas(result);
  }, [
    allPizzas,
    activeCategory,
    canCustomise,
    isNew,
    priceFrom,
    priceTo,
    doughType,
    ingredients,
  ]);

  // Переключение верхней категории
  const handleCategorySelect = (key) => {
    setActiveCategory(key);
  };

  // Обработка чекбоксов ингредиентов
  const handleIngredientChange = (key) => {
    setIngredients((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Сброс всех фильтров
  const handleResetFilters = () => {
    setActiveCategory("all");
    setCanCustomise(false);
    setIsNew(false);
    setPriceFrom("");
    setPriceTo("");
    setDoughType("");
    setIngredients({
      hasCheeseSauce: false,
      hasMozzarella: false,
      hasGarlic: false,
      hasPickles: false,
      hasRedOnion: false,
      hasTomatoes: false,
    });
  };

  // Счетчик корзины
  const updateCartCount = (id, delta) => {
    setCartCounts((prev) => {
      const current = prev[id] || 0;
      const updated = current + delta;
      if (updated <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: updated };
    });
  };

  const getImageUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  };

  return (
    <div className="home-container">
      {/* Шапка: категории и сортировка */}
      <div className="top-bar">
        <h1 className="main-title">Все пиццы</h1>
        <div className="top-bar-controls">
          <div className="categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`category-btn ${activeCategory === cat.key ? "active" : ""}`}
                onClick={() => handleCategorySelect(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="sorting">
            <span>⇅ Сортировка:</span>
            <span className="sort-value"> рейтингу</span>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="content-layout">
        {/* Боковая панель фильтрации */}
        <aside className="sidebar">
          <h3>Фильтрация</h3>

          <div className="filter-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={canCustomise}
                onChange={(e) => setCanCustomise(e.target.checked)}
              />
              <span className="custom-checkbox"></span>
              Можно собирать
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
              />
              <span className="custom-checkbox"></span>
              Новинки
            </label>
          </div>

          <div className="filter-group">
            <h4>Цена от и до:</h4>
            <div className="price-inputs">
              <div className="price-input-wrapper">
                <input
                  type="number"
                  placeholder="0"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                />
                <span className="currency">₽</span>
              </div>
              <div className="price-input-wrapper">
                <input
                  type="number"
                  placeholder="1950"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                />
                <span className="currency">₽</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h4>Ингредиенты:</h4>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={ingredients.hasCheeseSauce}
                onChange={() => handleIngredientChange("hasCheeseSauce")}
              />
              <span className="custom-checkbox"></span>
              Сырный соус
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={ingredients.hasMozzarella}
                onChange={() => handleIngredientChange("hasMozzarella")}
              />
              <span className="custom-checkbox"></span>
              Моцарелла
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={ingredients.hasGarlic}
                onChange={() => handleIngredientChange("hasGarlic")}
              />
              <span className="custom-checkbox"></span>
              Чеснок
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={ingredients.hasPickles}
                onChange={() => handleIngredientChange("hasPickles")}
              />
              <span className="custom-checkbox"></span>
              Солёные огурчики
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={ingredients.hasRedOnion}
                onChange={() => handleIngredientChange("hasRedOnion")}
              />
              <span className="custom-checkbox"></span>
              Красный лук
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={ingredients.hasTomatoes}
                onChange={() => handleIngredientChange("hasTomatoes")}
              />
              <span className="custom-checkbox"></span>
              Томаты
            </label>
          </div>

          <div className="filter-group">
            <h4>Тип теста:</h4>
            <label className="radio-label">
              <input
                type="radio"
                name="dough"
                value="traditional"
                checked={doughType === "traditional"}
                onChange={(e) => setDoughType(e.target.value)}
              />
              <span className="custom-radio"></span>
              Традиционное
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="dough"
                value="thin"
                checked={doughType === "thin"}
                onChange={(e) => setDoughType(e.target.value)}
              />
              <span className="custom-radio"></span>
              Тонкое
            </label>
          </div>

          <button className="apply-btn" onClick={handleResetFilters}>
            Сбросить фильтры
          </button>
        </aside>

        {/* Сетка карточек пицц */}
        <main className="main-content">
          {loading ? (
            <div className="loading">Загрузка пицц...</div>
          ) : filteredPizzas.length === 0 ? (
            <div style={{ padding: "40px 0", fontSize: "18px", color: "#888" }}>
              Пиццы по выбранным фильтрам не найдены 🍕
            </div>
          ) : (
            <div className="pizza-grid">
              {filteredPizzas.map((pizza) => {
                const count = cartCounts[pizza.id] || 0;
                return (
                  <div key={pizza.id} className="pizza-card">
                    <div className="pizza-image-box">
                      {isTrue(pizza.canCustomise) && (
                        <span className="customise-badge">⚙️</span>
                      )}
                      <img src={getImageUrl(pizza.imageUrl)} alt={pizza.title} />
                    </div>

                    <h3 className="pizza-title">{pizza.title}</h3>
                    <p className="pizza-description">{pizza.description}</p>

                    <div className="pizza-card-footer">
                      <span className="pizza-price">от {pizza.price} ₽</span>

                      {isTrue(pizza.canCustomise) ? (
                        <button className="btn-customise">
                          <span>⚙️</span> Собрать
                        </button>
                      ) : count > 0 ? (
                        <div className="counter-btn">
                          <button onClick={() => updateCartCount(pizza.id, -1)}>−</button>
                          <span>{count}</span>
                          <button onClick={() => updateCartCount(pizza.id, 1)}>+</button>
                        </div>
                      ) : (
                        <button
                          className="btn-add"
                          onClick={() => updateCartCount(pizza.id, 1)}
                        >
                          + Добавить
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Пагинация */}
          <div className="pagination">
            <button className="page-arrow" disabled>‹</button>
            <button className="page-num active">1</button>
            <button className="page-arrow" disabled>›</button>
            <span className="page-info">{filteredPizzas.length} из {allPizzas.length}</span>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;