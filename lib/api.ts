import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data: { name: string; email: string; password: string; age: number; job: string }) =>
    apiClient.post('/api/auth/register', data),
  login: (data: { email: string; password: string }) => apiClient.post('/api/auth/login', data),
};

// User APIs
export const userAPI = {
  getProfile: (id: number) => apiClient.get(`/api/users/${id}`),
  updateProfile: (id: number, data: any) => apiClient.put(`/api/users/${id}`, data),
};

// Room APIs
export const roomAPI = {
  getRooms: (filters?: any) => apiClient.get('/api/rooms', { params: filters }),
  createRoom: (data: any) => apiClient.post('/api/rooms', data),
};

// Match APIs
export const matchAPI = {
  getMatches: () => apiClient.get('/api/matches'),
  createMatch: (data: { matched_user_id: number; compatibility_score: number }) =>
    apiClient.post('/api/matches', data),
};

// Message APIs
export const messageAPI = {
  getMessages: (otherUserId: number) =>
    apiClient.get('/api/messages', { params: { other_user_id: otherUserId } }),
  sendMessage: (data: { receiver_id: number; content: string }) => apiClient.post('/api/messages', data),
};

// Expense APIs
export const expenseAPI = {
  getExpenses: (groupId: number) => apiClient.get('/api/expenses', { params: { group_id: groupId } }),
  addExpense: (data: { group_id: number; description: string; amount: number; category: string }) =>
    apiClient.post('/api/expenses', data),
};

export default apiClient;