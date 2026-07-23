import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100).optional(),
  age: z.number().min(18).max(100),
  job: z.string().max(100),
  bio: z.string().max(500).optional(),
  location: z.string().max(200).optional(),
  avatar_url: z.string().url().optional(),
});

export const roomSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(5).max(200),
  description: z.string().max(1000).optional(),
  price: z.number().positive(),
  rooms: z.number().min(1),
  address: z.string().max(300),
  city: z.string().max(100),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  image_url: z.string().url().optional(),
  owner_id: z.number(),
});

export const matchSchema = z.object({
  id: z.number().optional(),
  user_id_1: z.number(),
  user_id_2: z.number(),
  compatibility_score: z.number().min(0).max(100),
  status: z.enum(['pending', 'accepted', 'rejected']).optional(),
});

export const messageSchema = z.object({
  id: z.number().optional(),
  sender_id: z.number(),
  receiver_id: z.number(),
  content: z.string().min(1).max(1000),
  read: z.boolean().optional(),
});

export const expenseSchema = z.object({
  id: z.number().optional(),
  group_id: z.number(),
  description: z.string().min(1).max(200),
  amount: z.number().positive(),
  paid_by: z.number(),
  category: z.string().max(50),
});
