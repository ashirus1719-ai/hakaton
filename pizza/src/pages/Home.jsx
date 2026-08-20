import React, { useMemo, useState } from "react";
import "../styles/Home.css";

const products = [
  {
    id: 1,
    title: "Сырный цыпленок",
    description: "Цыпленок, моцарелла, сырный соус, томаты, чеснок",
    price: 395,
    category: "Сытные",
    ingredients: ["cheese", "chicken", "tomato"],
    dough: "traditional",
    isNew: false,
    canAssemble: true,
    image: "cheese",
  },
  {
    id: 2,
    title: "Диабло",
    description: "Острая чоризо, острый перец халапеньо, соус барбекю",
    price: 449,
    category: "Острые",
    ingredients: ["cheese", "cucumber", "tomato"],
    dough: "thin",
    isNew: true,
    canAssemble: false,
    image: "diablo",
  },
  {
    id: 3,
    title: "Чизбургер-пицца",
    description: "Мясной соус болоньезе, сыр бургер, соленые огурчики",
    price: 399,
    category: "Мясные",
    ingredients: ["cheese", "cucumber", "tomato"],
    dough: "traditional",
    isNew: false,
    canAssemble: true,
    image: "burger",
  },
  {
    id: 4,
    title: "Пепперони фреш",
    description: "Пепперони, моцарелла, томаты и фирменный томатный соус",
    price: 425,
    category: "Классика",
    ingredients: ["cheese", "tomato"],
    dough: "traditional",
    isNew: true,
    canAssemble: false,
    image: "pepperoni",
  },
  {
    id: 5,
    title: "Маргарита",
    description: "Моцарелла, томаты, итальянские травы и томатный соус",
    price: 349,
    category: "Классика",
    ingredients: ["cheese", "tomato"],
    dough: "thin",
    isNew: false,
    canAssemble: true,
    image: "cheese",
  },
  {
    id: 6,
    title: "Овощная",
    description: "Сладкий перец, томаты, красный лук, сыр и соус ранч",
    price: 379,
    category: "Овощные",
    ingredients: ["cheese", "tomato", "onion"],
    dough: "traditional",
    isNew: false,
    canAssemble: true,
    image: "burger",
  },
];

const ingredientOptions = [
  { id: "cheese", label: "Сырный соус" },
  { id: "mozzarella", label: "Моцарелла" },
  { id: "onion", label: "Лук" },
  { id: "cucumber", label: "Соленые огурчики" },
  { id: "tomato", label: "Томаты" },
];

const initialFilters = {
  canAssemble: true,
  isNew: false,
  minPrice: "",
  maxPrice: "",
  ingredients: ["cheese"],
  dough: "traditional",
};

function Home() {
  const [filters, setFilters] = useState(initialFilters);
  const [counts, setCounts] = useState({});
  const [activePage, setActivePage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const minPrice = Number(filters.minPrice) || 0;
      const maxPrice = Number(filters.maxPrice) || Infinity;
      const hasIngredients = filters.ingredients.every((ingredient) =>
        product.ingredients.includes(ingredient)
      );

      return (
        product.price >= minPrice &&
        product.price <= maxPrice &&
        product.dough === filters.dough &&
        (!filters.canAssemble || product.canAssemble) &&
        (!filters.isNew || product.isNew) &&
        hasIngredients
      );
    });
  }, [filters]);

  const updateFilter = (name, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  const toggleIngredient = (ingredient) => {
    setFilters((currentFilters) => {
      const ingredients = currentFilters.ingredients.includes(ingredient)
        ? currentFilters.ingredients.filter((item) => item !== ingredient)
        : [...currentFilters.ingredients, ingredient];

      return {
        ...currentFilters,
        ingredients,
      };
    });
  };

  const changeCount = (productId, value) => {
    setCounts((currentCounts) => ({
      ...currentCounts,
      [productId]: Math.max((currentCounts[productId] || 0) + value, 0),
    }));
  };

  return (
    <main className="home-page">
      <aside className="filters">
        <h2>Фильтрация</h2>

        <div className="filter-group">
          <label className="check-row">
            <input
              type="checkbox"
              checked={filters.canAssemble}
              onChange={(event) =>
                updateFilter("canAssemble", event.target.checked)
              }
            />
            Можно собрать
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={filters.isNew}
              onChange={(event) => updateFilter("isNew", event.target.checked)}
            />
            Новинки
          </label>
        </div>

        <div className="filter-group">
          <h3>Цена от и до:</h3>
          <div className="price-row">
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(event) => updateFilter("minPrice", event.target.value)}
            />
            <input
              type="number"
              placeholder="1950"
              value={filters.maxPrice}
              onChange={(event) => updateFilter("maxPrice", event.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <h3>Ингредиенты:</h3>
          {ingredientOptions.map((ingredient) => (
            <label className="check-row" key={ingredient.id}>
              <input
                type="checkbox"
                checked={filters.ingredients.includes(ingredient.id)}
                onChange={() => toggleIngredient(ingredient.id)}
              />
              {ingredient.label}
            </label>
          ))}
          <button className="show-more" type="button">
            + Показать все
          </button>
        </div>

        <div className="filter-group">
          <h3>Тип теста:</h3>
          <label className="check-row">
            <input
              type="radio"
              name="dough"
              checked={filters.dough === "traditional"}
              onChange={() => updateFilter("dough", "traditional")}
            />
            Традиционное
          </label>
          <label className="check-row">
            <input
              type="radio"
              name="dough"
              checked={filters.dough === "thin"}
              onChange={() => updateFilter("dough", "thin")}
            />
            Тонкое
          </label>
        </div>

        <button className="apply-filter" type="button" onClick={() => setActivePage(1)}>
          Применить
        </button>
      </aside>

      <section className="catalog">
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <span className="product-badge">{product.category}</span>
                <button className="product-settings" type="button" aria-label="Настроить товар">
                  ⚙
                </button>
                <div className={`pizza-preview pizza-${product.image}`}>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <h3>{product.title}</h3>
              <p>{product.description}</p>

              <div className="product-actions">
                <strong>от {product.price} ₽</strong>
                {(counts[product.id] || 0) === 0 ? (
                  <button
                    className="add-button"
                    type="button"
                    onClick={() => changeCount(product.id, 1)}
                  >
                    + Добавить
                  </button>
                ) : (
                  <div className="quantity">
                    <button type="button" onClick={() => changeCount(product.id, -1)}>
                      −
                    </button>
                    <span>{counts[product.id]}</span>
                    <button type="button" onClick={() => changeCount(product.id, 1)}>
                      +
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-products">Под эти фильтры товаров пока нет</div>
        )}

        <div className="pagination">
          <button type="button" disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
            ‹
          </button>
          {[1, 2, 3].map((page) => (
            <button
              className={activePage === page ? "active" : ""}
              type="button"
              key={page}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
          <button type="button" onClick={() => setActivePage(activePage + 1)}>
            ›
          </button>
          <span>10 из 65</span>
        </div>
      </section>
    </main>
  );
}

export default Home;
