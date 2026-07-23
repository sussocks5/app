'use client';

import { useState } from 'react';
import { FaUsers, FaHome, FaHeart, FaComments, FaWallet } from 'react-icons/fa';
import RoommateCard from './components/RoommateCard';

const roommates = [
  {id:1, name:"Алексей Морозов", age:26, compat:96, job:"Программист", img:"https://picsum.photos/id/64/600/400"},
  {id:2, name:"Мария Соколова", age:24, compat:89, job:"Дизайнер", img:"https://picsum.photos/id/1005/600/400"},
  {id:3, name:"Дмитрий Ковалёв", age:28, compat:82, job:"Маркетолог", img:"https://picsum.photos/id/201/600/400"}
];

export default function Home() {
  const [activePage, setActivePage] = useState(0);
  const [matchCount, setMatchCount] = useState(3);
  const [profileOpen, setProfileOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>(['👋 Привет! Когда удобно посмотреть квартиру?']);
  const [chatInput, setChatInput] = useState('');

  const navigate = (page: number) => {
    setActivePage(page);
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      setMessages([...messages, chatInput]);
      setChatInput('');
    }
  };

  return (
    <div className="p-8">
      {activePage === 0 && (
        <div>
          <h1 className="text-4xl font-bold mb-2">Найди идеальных соседей</h1>
          <p className="text-zinc-400 mb-8">Алгоритм CoLive подобрал для тебя 28 человек</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roommates.map(roommate => (
              <RoommateCard key={roommate.id} roommate={roommate} />
            ))}
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
            </div>
          </div>
        </div>
      )}

      {activePage === 2 && (
        <div>
          <h1 className="text-4xl font-bold mb-8">Твои матчи</h1>
          <div className="space-y-6">
            {roommates.map(r => (
              <div key={r.id} onClick={() => navigate(3)} className="bg-zinc-900 p-6 rounded-3xl flex gap-6 card cursor-pointer">
                <img src={r.img} alt={r.name} className="w-20 h-20 rounded-2xl" />
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-emerald-400">{r.compat}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activePage === 3 && (
        <div>
          <h1 className="text-4xl font-bold mb-6">Чаты</h1>
          <div className="bg-zinc-900 rounded-3xl p-6 max-w-lg">
            <div className="h-96 overflow-auto mb-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={idx === 0 ? 'text-emerald-400' : 'text-right'}>
                  {msg}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <input 
                id="chat-input" 
                type="text" 
                placeholder="Напиши сообщение..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-zinc-800 rounded-3xl px-6 py-4"
              />
              <button onClick={sendMessage} className="px-8 bg-violet-600 rounded-3xl">Отправить</button>
            </div>
          </div>
        </div>
      )}

      {activePage === 4 && (
        <div>
          <h1 className="text-4xl font-bold mb-8">Общие расходы</h1>
          <div className="bg-zinc-900 rounded-3xl p-8">
            <p className="text-2xl">Аренда: <span className="font-bold">45 000 ₽</span></p>
            <button onClick={() => alert("💰 Расход добавлен")} className="mt-10 px-8 py-4 bg-white text-black rounded-2xl font-medium">
              Добавить расход
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
