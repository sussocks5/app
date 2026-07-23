'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaBriefcase } from 'react-icons/fa';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
        age: parseInt(age),
        job,
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to home
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            C
          </div>
          <h1 className="text-3xl font-bold">CoLive</h1>
          <p className="text-zinc-400 mt-2">Присоединись к нам</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Имя</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3.5 text-zinc-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-10 py-3 focus:border-violet-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-10 py-3 focus:border-violet-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Пароль</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-10 py-3 focus:border-violet-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Возраст</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 focus:border-violet-500 outline-none"
              required
              min="18"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Профессия</label>
            <div className="relative">
              <FaBriefcase className="absolute left-3 top-3.5 text-zinc-500" />
              <input
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="Программист"
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-10 py-3 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-3 rounded-2xl transition mt-6"
          >
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="text-center mt-6 text-zinc-400">
          <p>Уже есть аккаунт? <a href="/login" className="text-violet-500 hover:text-violet-400">Войти</a></p>
        </div>
      </div>
    </div>
  );
}