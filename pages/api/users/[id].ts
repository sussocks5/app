import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await query(
        'SELECT id, name, email, age, job, bio, location, avatar_url, profile_completion FROM users WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  } else if (req.method === 'PUT') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const decoded = verifyToken(token);
      if (!decoded || decoded.userId !== Number(id)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const { name, bio, location, avatar_url } = req.body;
      const result = await query(
        'UPDATE users SET name = $1, bio = $2, location = $3, avatar_url = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
        [name, bio, location, avatar_url, id]
      );

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
