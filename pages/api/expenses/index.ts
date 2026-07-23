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

  if (req.method === 'GET') {
    try {
      const { group_id } = req.query;
      
      const result = await query(
        `SELECT e.*, u.name as paid_by_name 
         FROM expenses e 
         JOIN users u ON e.paid_by = u.id 
         WHERE e.group_id = $1 
         ORDER BY e.created_at DESC`,
        [group_id]
      );

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  } else if (req.method === 'POST') {
    try {
      const { group_id, description, amount, category } = req.body;
      
      const result = await query(
        'INSERT INTO expenses (group_id, description, amount, paid_by, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [group_id, description, amount, decoded.userId, category]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating expense:', error);
      res.status(500).json({ error: 'Failed to create expense' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
