import axios from "axios";
import React, { useState } from "react";

function Panel() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const apiUrl = "https://backend-store-1-tmkv.onrender.com/products";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const product = {
        ...form,
        price: Number(form.price),
      };

      await axios.post(apiUrl, product);

      setForm({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
      setMessage("Товар добавлен");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Не получилось добавить товар"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="panel-page">
      <h1>Панель товаров</h1>

      <form className="panel-form" onSubmit={handleSubmit}>
        <label>
          Название
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Маргарита"
            required
          />
        </label>

        <label>
          Цена
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="2500"
            min="0"
            required
          />
        </label>

        <label>
          Картинка
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/pizza.jpg"
          />
        </label>

        <label>
          Категория
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="pizza"
          />
        </label>

        <label>
          Описание
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Сыр, томаты, базилик"
            rows="4"
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Добавляю..." : "Добавить товар"}
        </button>

        {message && <p className="panel-message">{message}</p>}
      </form>
    </main>
  );
}

export default Panel;
