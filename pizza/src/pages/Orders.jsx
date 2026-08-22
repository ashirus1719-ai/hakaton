import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function OrdersPage({ user = "Алексей", cartTotal = 0, cartCount = 0, onCart, onLogin, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false)

 
  const [syrmayaDough, setSyrmayaDough] = useState('тонкое')
  const [syrmayaSize, setSyrmayaSize] = useState('26 см.')

  const [mexicanDough, setMexicanDough] = useState('тонкое')
  const [mexicanSize, setMexicanSize] = useState('26 см.')

  const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`

  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Оплачено':
        return <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Оплачено</span>
      case 'Отклонено':
        return <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Отклонено</span>
      case 'В ожидании':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">В ожидании</span>
      default:
        return <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
   
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="text-2xl text-orange-500 font-bold">◢</div>
          <div>
            <div className="font-bold text-xl text-gray-800 tracking-wider">NEXT PIZZA</div>
            <div className="text-xs text-gray-400">вкусней уже точно некуда</div>
          </div>
        </Link>

       
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl w-1/3">
          <span className="mr-2 text-gray-400">⌕</span>
          <input
            type="text"
            placeholder="Поиск пиццы..."
            className="bg-transparent outline-none w-full text-sm text-gray-700"
          />
        </div>

        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 transition"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span>♙</span>
              <span>{user ? "Профиль" : "Войти"}</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg p-2 z-10">
                {user ? (
                  <>
                    <div className="px-3 py-2 font-medium text-gray-700 border-b mb-1">{user}</div>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onLogin}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Войти
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            className="flex items-center gap-3 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition"
            onClick={onCart}
          >
            <span>{formatPrice(cartTotal)}</span>
            <span className="h-4 w-[1px] bg-orange-300"></span>
            <span>🛒</span>
            <span>{cartCount}</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Мои заказы</h1>

        <div className="flex flex-col gap-6">

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Заказ #15</h2>
                <p className="text-xs text-gray-400 mt-1">16 февраля 2024, в 20:31</p>
              </div>
              {getStatusBadge('Оплачено')}
            </div>

            <div className="flex flex-col gap-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Чизбургер-пицца</h3>
                  <p className="text-xs text-gray-500">Средняя 30 см, традиционное тесто</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-800">965 ₽</span>
                  <span className="text-xs text-gray-400 ml-2">2 шт.</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Диабло</h3>
                  <p className="text-xs text-gray-500">Большая 35 см, традиционное тесто</p>
                  <p className="text-xs text-gray-400">+ моцарелла, шампиньоны</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-800">1280 ₽</span>
                  <span className="text-xs text-gray-400 ml-2">1 шт.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-gray-500 font-medium">Итого:</span>
              <span className="text-xl font-bold text-gray-900">2245 ₽</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
            
        
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Сырная</h3>
                
              
                <div className="flex bg-gray-100 p-1 rounded-xl mb-2 text-xs">
                  {['тонкое', 'традиционное'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSyrmayaDough(type)}
                      className={`flex-1 py-1.5 rounded-lg font-medium transition ${syrmayaDough === type ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

              
                <div className="flex bg-gray-100 p-1 rounded-xl mb-4 text-xs">
                  {['26 см.', '30 см.', '40 см.'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSyrmayaSize(size)}
                      className={`flex-1 py-1.5 rounded-lg font-medium transition ${syrmayaSize === size ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-gray-800">от 245 ₽</span>
                <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-semibold hover:bg-orange-100 transition text-sm">
                  + Добавить
                </button>
              </div>
            </div>

         
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Мексиканская</h3>

               
                <div className="flex bg-gray-100 p-1 rounded-xl mb-2 text-xs">
                  {['тонкое', 'традиционное'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setMexicanDough(type)}
                      className={`flex-1 py-1.5 rounded-lg font-medium transition ${mexicanDough === type ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

             
                <div className="flex bg-gray-100 p-1 rounded-xl mb-4 text-xs">
                  {['26 см.', '30 см.', '40 см.'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setMexicanSize(size)}
                      className={`flex-1 py-1.5 rounded-lg font-medium transition ${mexicanSize === size ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-gray-800">от 445 ₽</span>
                <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-semibold hover:bg-orange-100 transition text-sm">
                  + Добавить
                </button>
              </div>
            </div>

          </div>

        
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Заказ #16</h2>
                <p className="text-xs text-gray-400 mt-1">14 февраля 2024, в 17:45</p>
              </div>
              {getStatusBadge('Отклонено')}
            </div>
          </div>

          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Заказ #17</h2>
                <p className="text-xs text-gray-400 mt-1">11 февраля 2024, в 16:22</p>
              </div>
              {getStatusBadge('Оплачено')}
            </div>
          </div>

        
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Заказ #18</h2>
                <p className="text-xs text-gray-400 mt-1">11 февраля 2024, в 13:44</p>
              </div>
              {getStatusBadge('В ожидании')}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default OrdersPage