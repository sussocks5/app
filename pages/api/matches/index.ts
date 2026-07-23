import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const userId = decoded.userId;

  if (req.method === 'GET') {
    try {
      const result = await query(
        `SELECT m.*, u1.name as user1_name, u1.avatar_url as user1_avatar, u2.name as user2_name, u2.avatar_url as user2_avatar 
         FROM matches m 
         JOIN users u1 ON m.user_id_1 = u1.id 
         JOIN users u2 ON m.user_id_2 = u2.id 
         WHERE (m.user_id_1 = $1 OR m.user_id_2 = $1) AND m.status = 'accepted'
         ORDER BY m.created_at DESC`,
        [userId]
      );

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching matches:', error);
      res.status(500).json({ error: 'Failed to fetch matches' });
    }
  } else if (req.method === 'POST') {
    try {
      const { matched_user_id, compatibility_score } = req.body;
      
      const result = await query(
        'INSERT INTO matches (user_id_1, user_id_2, compatibility_score, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, matched_user_id, compatibility_score, 'pending']
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating match:', error);
      res.status(500).json({ error: 'Failed to create match' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
