'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    // Здесь можно добавить логику получения уведомлений из API
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Логика поиска
    if (searchQuery.trim()) {
      alert(`Поиск по: ${searchQuery}`);
    }
  };

  const handleLogout = () => {
    // Логика выхода из системы
    alert('Вы вышли из системы');
  };

  return (
    <header className="bg-zinc-900 border-b border-white/10 px-8 py-5 flex justify-between items-center sticky top-0 z-50">
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск соседей или квартир..."
            className="bg-zinc-800 border border-white/10 focus:border-violet-500 rounded-3xl px-6 py-3 w-full outline-none"
          />
          <button type="submit" className="absolute right-3 top-3 text-xl text-gray-400">
            <FaSearch />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-4 ml-6">
        <button 
          type="button" 
          onClick={() => alert('Уведомления')}
          className="p-3 hover:bg-white/10 rounded-2xl"
        >
          <div className="relative">
            <FaBell className="text-xl text-white" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-xs px-1.5 py-0.5 rounded-full text-white">
                {notifications}
              </span>
            )}
          </div>
        </button>

        <div className="cursor-pointer relative" onClick={() => setProfileOpen(!profileOpen)}>
          <FaUser className="text-2xl text-white" />
          {profileOpen && (
            <div className="absolute top-10 right-0 bg-zinc-900 p-4 rounded-lg shadow-lg z-10">
              <ul className="list-none">
                <li className="py-2 hover:bg-white/10 cursor-pointer">
                  Профиль
                </li>
                <li className="py-2 hover:bg-white/10 cursor-pointer">
                  Настройки
                </li>
                <li className="py-2 hover:bg-white/10 cursor-pointer" onClick={handleLogout}>
                  Выйти
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
