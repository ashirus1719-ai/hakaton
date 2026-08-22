import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NotFound({ 
  user = null, 
  cartTotal = 0, 
  cartCount = 0, 
  onLogin, 
  onLogout, 
  onCart 
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  const handleRefresh = () => {
    window.location.reload()
  }

  const formatPrice = (price) => `${price.toLocaleString("ru-RU")} ₽`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
    
      <header className="header flex items-center justify-between px-8 py-4 bg-white shadow-sm">
    
        <Link to="/" className="header-logo flex items-center gap-3 no-underline">
          <div className="logo-icon text-2xl text-orange-500">◢</div>
          <div className="logo-text">
            <div className="logo-title font-bold text-xl text-gray-800 tracking-wider">NEXT PIZZA</div>
            <div className="logo-subtitle text-xs text-gray-400">вкусно — и не только</div>
          </div>
        </Link>

        <div className="header-search flex items-center bg-gray-100 px-4 py-2 rounded-xl w-1/3">
          <span className="search-icon mr-2 text-gray-400">⌕</span>
          <input 
            type="text" 
            placeholder="Поиск пиццы..." 
            className="bg-transparent outline-none w-full text-sm text-gray-700"
          />
        </div>

    
        <div className="header-right flex items-center gap-4">
     
          <div className="profile-container relative">
            <button
              className="profile-button flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 transition"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span className="profile-icon">♙</span>
              <span>{user ? "Профиль" : "Войти"}</span>
            </button>

            {profileOpen && (
              <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg p-2 z-10">
                {user ? (
                  <>
                    <div className="profile-user px-3 py-2 font-medium text-gray-700 border-b mb-1">{user}</div>
                    <button
                      className="dropdown-item w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg"
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
                    className="dropdown-item w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
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

          <button 
            className="header-cart flex items-center gap-3 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition" 
            onClick={onCart}
          >
            <span className="cart-price">{formatPrice(cartTotal)}</span>
            <span className="cart-divider h-4 w-[1px] bg-orange-300"></span>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

     
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 my-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Страница не найдена
        </h1>

        <p className="text-gray-600 mb-6 max-w-md">
          Проверьте корректность введённого адреса или повторите попытку позже
        </p>

        <div className="flex gap-4">
          <Link
            to="/"
            className="px-6 py-2.5 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition duration-300 shadow-md"
          >
            На главную
          </Link>

          <button
            onClick={handleRefresh}
            className="px-6 py-2.5 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition duration-300"
          >
            Обновить
          </button>
        </div>
      </main>
    </div>
  )
}

export default NotFound