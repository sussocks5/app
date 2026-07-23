'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function ProfileMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 hover:bg-white/10 rounded-2xl transition"
      >
        <FaUser className="text-xl" />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-zinc-900 border border-white/10 rounded-2xl p-4 min-w-48 z-50">
          <div className="mb-4 pb-4 border-b border-white/10">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-zinc-400">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-500 hover:text-red-400 py-2"
          >
            <FaSignOutAlt /> Выйти
          </button>
        </div>
      )}
    </div>
  );
}
