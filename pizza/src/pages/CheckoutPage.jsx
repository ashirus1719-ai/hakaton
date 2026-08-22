import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CheckoutPage({ user = null, onLogin, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false)


  const [firstName, setFirstName] = useState('Вася')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('vasya@pupkin.ru')
  const [phone, setPhone] = useState('+7 (999) 100-20-20')
  const [address, setAddress] = useState('Москва, ул. Мира 12')
  const [comment, setComment] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('Доставка в 11:00')
  const [promoCode, setPromoCode] = useState('')


  const [cheeseburgerCount, setCheeseburgerCount] = useState(2)
  const [diabloCount, setDiabloCount] = useState(1)

  const [syrmayaDough, setSyrmayaDough] = useState('тонкое')
  const [syrmayaSize, setSyrmayaSize] = useState('26 см.')

  const [mexicanDough, setMexicanDough] = useState('тонкое')
  const [mexicanSize, setMexicanSize] = useState('26 см.')


  const handleClearCart = () => {
    setCheeseburgerCount(0)
    setDiabloCount(0)
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

       
        <div className="relative">
          <button
            className="flex items-center gap-2 px-5 py-2.5 border rounded-xl hover:bg-gray-50 transition font-medium text-gray-700"
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
                  <button onClick={onLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg">
                    Выйти
                  </button>
                </>
              ) : (
                <button onClick={onLogin} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                  Войти
                </button>
              )}
            </div>
          )}
        </div>
      </header>

    
      <main className="max-w-7xl w-full mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          <div className="lg:col-span-2 flex flex-col gap-8">
            
         
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                <h2 className="text-xl font-bold text-gray-800">1. Корзина</h2>
                <button 
                  onClick={handleClearCart}
                  className="text-sm text-gray-400 hover:text-red-500 transition flex items-center gap-1"
                >
                  <span>🗑</span> Очистить корзину
                </button>
              </div>

              {cheeseburgerCount > 0 || diabloCount > 0 ? (
                <div className="flex flex-col gap-4">
              
                  {cheeseburgerCount > 0 && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <div>
                        <h3 className="font-bold text-gray-800">Чизбургер-пицца</h3>
                        <p className="text-xs text-gray-400">Средняя 30 см, традиционное тесто</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-bold text-gray-800">965 ₽</span>
                        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-xl">
                          <button onClick={() => setCheeseburgerCount(Math.max(0, cheeseburgerCount - 1))} className="text-gray-500 font-bold">-</button>
                          <span className="font-bold text-sm">{cheeseburgerCount}</span>
                          <button onClick={() => setCheeseburgerCount(cheeseburgerCount + 1)} className="text-gray-500 font-bold">+</button>
                        </div>
                      </div>
                    </div>
                  )}

              
                  {diabloCount > 0 && (
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-bold text-gray-800">Диабло</h3>
                        <p className="text-xs text-gray-400">Большая 35 см, традиционное тесто</p>
                        <p className="text-xs text-gray-400">+ моцарелла, шампиньоны</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-bold text-gray-800">1280 ₽</span>
                        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-xl">
                          <button onClick={() => setDiabloCount(Math.max(0, diabloCount - 1))} className="text-gray-500 font-bold">-</button>
                          <span className="font-bold text-sm">{diabloCount}</span>
                          <button onClick={() => setDiabloCount(diabloCount + 1)} className="text-gray-500 font-bold">+</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">Корзина пуста</p>
              )}
            </div>

        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Сырная</h3>
                  <div className="flex bg-gray-100 p-1 rounded-xl mb-2 text-xs">
                    {['тонкое', 'традиционное'].map((type) => (
                      <button key={type} onClick={() => setSyrmayaDough(type)} className={`flex-1 py-1.5 rounded-lg font-medium transition ${syrmayaDough === type ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                  <div className="flex bg-gray-100 p-1 rounded-xl mb-4 text-xs">
                    {['26 см.', '30 см.', '40 см.'].map((size) => (
                      <button key={size} onClick={() => setSyrmayaSize(size)} className={`flex-1 py-1.5 rounded-lg font-medium transition ${syrmayaSize === size ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>
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
                      <button key={type} onClick={() => setMexicanDough(type)} className={`flex-1 py-1.5 rounded-lg font-medium transition ${mexicanDough === type ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                  <div className="flex bg-gray-100 p-1 rounded-xl mb-4 text-xs">
                    {['26 см.', '30 см.', '40 см.'].map((size) => (
                      <button key={size} onClick={() => setMexicanSize(size)} className={`flex-1 py-1.5 rounded-lg font-medium transition ${mexicanSize === size ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>
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

           
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                2. Персональная информация
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Имя</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Фамилия</label>
                  <input
                    type="text"
                    placeholder="Введите вашу фамилию"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">E-Mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Телефон</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

           
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                3. Адрес доставки
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Введите адрес</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-orange-500"
                  />
                
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Москва, ул. Мира 12', 'Москва, ул. Мира 12А', 'Москва, ул. Мира 10'].map((item) => (
                      <button
                        key={item}
                        onClick={() => setAddress(item)}
                        className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Комментарий к заказу</label>
                  <textarea
                    rows="3"
                    placeholder="Укажите тут дополнительную информацию для курьера"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-orange-500 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Время доставки</label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-orange-500"
                  >
                    <option>Доставка в 11:00</option>
                    <option>Доставка в 12:00</option>
                    <option>Доставка в 13:00</option>
                    <option>Как можно скорее</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-6">
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-gray-500 text-lg">Итого:</span>
                <span className="text-3xl font-extrabold text-gray-900">2365 ₽</span>
              </div>

              <div className="flex flex-col gap-3 text-sm pb-6 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Стоимость товаров:</span>
                  <span className="font-semibold text-gray-800">2005 ₽</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Налоги:</span>
                  <span className="font-semibold text-gray-800">240 ₽</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Доставка:</span>
                  <span className="font-semibold text-gray-800">120 ₽</span>
                </div>
              </div>

              <div className="py-4">
                <input
                  type="text"
                  placeholder="У меня есть промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none mb-4"
                />

                <button className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 transition shadow-md shadow-orange-200 text-center block">
                  Перейти к оплате
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default CheckoutPage