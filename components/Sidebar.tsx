import { useState } from 'react';
import { FaUsers, FaHome, FaHeart, FaComments, FaWallet } from 'react-icons/fa';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <aside className="w-72 bg-zinc-900 border-r border-white/10 p-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-11 h-11 bg-violet-600 rounded-2xl flex items-center justify-center text-3xl font-bold">C</div>
        <div className="text-3xl font-bold tracking-tighter">CoLive</div>
      </div>

      <nav className="space-y-2">
        <a 
          href="#" 
          className={`nav-item flex items-center gap-3 px-4 py-3 rounded-2xl 
          ${activeTab === 0 ? 'bg-white/10' : 'hover:bg-white/10'} 
          cursor-pointer`}
          onClick={() => handleTabClick(0)}
        >
          <FaUsers /> Поиск соседей
        </a>

        <a 
          href="#" 
          className={`nav-item flex items-center gap-3 px-4 py-3 rounded-2xl 
          ${activeTab === 1 ? 'bg-white/10' : 'hover:bg-white/10'} 
          cursor-pointer`}
          onClick={() => handleTabClick(1)}
        >
          <FaHome /> Квартиры
        </a>

        <a 
          href="#" 
          className={`nav-item flex items-center gap-3 px-4 py-3 rounded-2xl 
          ${activeTab === 2 ? 'bg-white/10' : 'hover:bg-white/10'} 
          cursor-pointer`}
          onClick={() => handleTabClick(2)}
        >
          <FaHeart /> Матчи 
          <span className="ml-auto bg-emerald-500 text-xs px-2 py-0.5 rounded-full">3</span>
        </a>

        <a 
          href="#" 
          className={`nav-item flex items-center gap-3 px-4 py-3 rounded-2xl 
          ${activeTab === 3 ? 'bg-white/10' : 'hover:bg-white/10'} 
          cursor-pointer`}
          onClick={() => handleTabClick(3)}
        >
          <FaComments /> Чаты
        </a>

        <a 
          href="#" 
          className={`nav-item flex items-center gap-3 px-4 py-3 rounded-2xl 
          ${activeTab === 4 ? 'bg-white/10' : 'hover:bg-white/10'} 
          cursor-pointer`}
          onClick={() => handleTabClick(4)}
        >
          <FaWallet /> Расходы
        </a>
      </nav>

      <div className="mt-auto flex items-center gap-3 cursor-pointer hover:bg-white/10 p-3 rounded-2xl">
        <img 
          src="https://picsum.photos/id/64/48/48" 
          alt="Профиль" 
          className="w-10 h-10 rounded-2xl object-cover" 
        />
        <div>
          <div className="font-medium">Ты (Демо)</div>
          <div className="text-xs text-zinc-500">Профиль заполнен на 85%</div>
        </div>
      </div>
    </aside>
  );
}
