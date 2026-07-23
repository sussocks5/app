import './globals.css';
import { Metadata } from 'next';
import { FaUsers, FaHome, FaHeart, FaComments, FaWallet } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'CoLive — Совместная аренда',
  description: 'Приложение для поиска соседей по аренде жилья',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-zinc-950 text-zinc-100">
        <div className="flex h-screen">
          <aside className="w-72 bg-zinc-900 border-r border-white/10 p-6">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-11 h-11 bg-violet-600 rounded-2xl flex items-center justify-center text-3xl font-bold">C</div>
              <div className="text-3xl font-bold tracking-tighter">CoLive</div>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="nav-item flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 cursor-pointer">
                <FaUsers /> Поиск соседей
              </a>
              <a href="#" className="nav-item flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 cursor-pointer">
                <FaHome /> Квартиры
              </a>
              <a href="#" className="nav-item flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 cursor-pointer">
                <FaHeart /> Матчи <span className="ml-auto bg-emerald-500 text-xs px-2 py-0.5 rounded-full">3</span>
              </a>
              <a href="#" className="nav-item flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 cursor-pointer">
                <FaComments /> Чаты
              </a>
              <a href="#" className="nav-item flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 cursor-pointer">
                <FaWallet /> Расходы
              </a>
            </nav>

            <div className="mt-auto flex items-center gap-3 cursor-pointer hover:bg-white/10 p-3 rounded-2xl">
              <img src="https://picsum.photos/id/64/48/48" alt="Профиль" className="w-10 h-10 rounded-2xl object-cover" />
              <div>
                <div className="font-medium">Ты (Демо)</div>
                <div className="text-xs text-zinc-500">Профиль заполнен на 85%</div>
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-auto">
            <header className="bg-zinc-900 border-b border-white/10 px-8 py-5 flex justify-between items-center sticky top-0 z-50">
              <input type="text" placeholder="Поиск соседей или квартир..." className="bg-zinc-800 border border-white/10 focus:border-violet-500 rounded-3xl px-6 py-3 w-96 outline-none" />
              <button className="relative p-3 hover:bg-white/10 rounded-2xl">
                <i className="fas fa-bell text-xl"></i>
              </button>
            </header>
            
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
