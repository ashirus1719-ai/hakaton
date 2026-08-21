import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-content">
        {/* Левая часть */}
        <div className="notfound-left">
          <h1>Страница не найдена</h1>

          <p>
            Проверьте корректность введенного адреса
            <br />
            или повторите попытку позже
          </p>

          <div className="notfound-buttons">
            <button className="home-btn">← На главную</button>
            <button className="refresh-btn">Обновить</button>
          </div>
        </div>

        {/* Правая часть */}
        <div className="notfound-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="404"
          />

          <span className="error-code">404</span>
        </div>
      </div>
    </div>
  );
}

export default NotFound;