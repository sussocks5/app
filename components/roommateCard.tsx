import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface Roommate {
  id: number;
  name: string;
  age: number;
  compat: number;
  job: string;
  img: string;
}

export default function RoommateCard({ roommate }: { roommate: Roommate }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Здесь можно добавить логику отправки данных на сервер
    alert(`❤️ Матч! Совместимость ${roommate.compat}%`);
  };

  return (
    <div className="bg-zinc-900 rounded-3xl overflow-hidden card transition-all duration-300 ease-in-out hover:translate-y-[-12px]">
      <img 
        src={roommate.img} 
        alt={`${roommate.name} profile`} 
        className="w-full h-60 object-cover" 
      />
      <div className="p-6">
        <div className="flex justify-between">
          <div>
            <div className="font-semibold text-xl">{roommate.name}, {roommate.age}</div>
            <div className="text-sm text-zinc-400">{roommate.job}</div>
          </div>
          <div className="text-emerald-400 font-bold text-2xl">{roommate.compat}%</div>
        </div>
        
        <div className="mt-6 flex items-center justify-end">
          <button 
            onClick={handleLike}
            className={`w-full py-4 rounded-2xl ${isLiked ? 'bg-emerald-600' : 'bg-violet-600'} hover:bg-violet-500 text-white font-medium`}
          >
            {isLiked ? 'Взаимно!' : 'Нравится'}
            <FaHeart className={`ml-2 ${isLiked ? 'text-white' : 'text-gray-100'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
