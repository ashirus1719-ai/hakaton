import React, { useState } from "react";
import "./Header.css";

export default function Header({
  cartCount = 0,
  cartTotal = 0,
  user = null,
  onCart,
  onLogin,
  onLogout,
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  const formatPrice = (price) =>
    {price.toLocaleString("ru-RU")}  ;

  return (
    <header className="header">
      {/* ЛОГОТИП */}
      <div className="header-logo">
        <div className="logo-icon">◢</div>

        <div className="logo-text">
          <div className="logo-title">NEXT PIZZA</div>
          <div className="logo-subtitle">
            вкусно — и не только
          </div>
        </div>
      </div>

      {/* ПОИСК */}
      <div className="header-search">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Поиск пиццы..."
        />
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="header-right">
        {/* ПРОФИЛЬ */}
        <div className="profile-container">
          <button
            className="profile-button"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
          >
            <span className="profile-icon">
              ♙
            </span>

            <span>
              {user ? "Профиль" : "Войти"}
            </span>
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              {user ? (
                <>
                  <div className="profile-user">
                    {user}
                  </div>

                  <button
                    className="dropdown-item"
                    onClick={() => {
                      onLogout?.();
                      setProfileOpen(false);
                    }}
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <button
                  className="dropdown-item"
                  onClick={() => {
                    onLogin?.();
                    setProfileOpen(false);
                  }}
                >
                  Войти
                </button>
              )}
            </div>
          )}
        </div>

        {/* КОРЗИНА */}
        <button
          className="header-cart"
          onClick={onCart}
        >
          <span className="cart-price">
            {formatPrice(cartTotal)}
          </span>

          <span className="cart-divider"></span>

          <span className="cart-icon">
            🛒
          </span>

          <span className="cart-count">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}