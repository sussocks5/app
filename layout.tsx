import './globals.css';
import { Metadata } from 'next';
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
          <Sidebar />
          <main className="flex-1 overflow-auto flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
