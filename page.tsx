import { useState } from 'react';
import { FaUsers, FaHome, FaHeart, FaComments, FaWallet } from 'react-icons/fa';

const roommates = [
  {id:1, name:"Алексей Морозов", age:26, compat:96, job:"Программист", img:"https://picsum.photos/id/64/600/400"},
  {id:2, name:"Мария Соколова", age:24, compat:89, job:"Дизайнер", img:"https://picsum.photos/id/1005/600/400"},
  {id:3, name:"Дмитрий Ковалёв", age:28, compat:82, job:"Маркетолог", img:"https://picsum.photos/id/201/600/400"}
];

export default function Home() {
  const [activePage, setActivePage] = useState(0);
  const [matchCount, setMatchCount] = useState(3);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = (page: number) => {
    setActivePage(page);
  };

  const renderRoommates = () => {
    return roommates.map(r => (
      <div key={r.id} className="bg-zinc-900 rounded-3xl overflow-hidden card">
        <img src={r.img} alt="Сосед" className="w-full h-60 object-cover" />
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold text-xl">{r.name}, {r.age}</div>
              <div className="text-sm text-zinc-400">{r.job}</div>
            </div>
            <div className="text-emerald-400 font-bold text-2xl">{r.compat}%</div>
          </div>
          <button 
            onClick={() => alert(`❤️ Матч! Совместимость ${Math.floor(Math.random()*10 + 85)}%`)}
            className="mt-6 w-full py-4 bg-violet-600 hover:bg-violet-500 rounded-2xl font-medium"
          >
            Нравится
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-8">
      {activePage === 0 && (
        <div>
          <h1 className="text-4xl font-bold mb-2">Найди идеальных соседей</h1>
          <p className="text-zinc-400 mb-8">Алгоритм CoLive подобрал для тебя 28 человек</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderRoommates()}
          </div>
        </div>
      )}

      {activePage === 1 && (
        <div>
          <h1 className="text-4xl font-bold mb-8">Доступные квартиры под группу</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 rounded-3xl p-6 card">
              <img src="https://picsum.photos/id/133/800/400" alt="Квартира" className="rounded-2xl w-full h-64 object-cover" />
              <div className="mt-6">
                <div className="flex justify-between items-baseline">
                  <div className="font-semibold text-2xl">2-комн. квартира</div>
                  <div className="text-3xl font-bold">45 000 ₽</div>
                </div>
                <button 
                  onClick={() => alert("✅ Заявка отправлена!")}
                  className="mt-6 w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-semibold"
                >
                  Подать заявку в группу
                </button>
              </div>
            </
