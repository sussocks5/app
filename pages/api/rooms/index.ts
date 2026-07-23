import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { roomSchema } from '@/lib/validators';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { city, minPrice, maxPrice, rooms } = req.query;
      let sql = 'SELECT * FROM rooms WHERE 1=1';
      const params: any[] = [];

      if (city) {
        params.push(city);
        sql += ` AND city = $${params.length}`;
      }
      if (minPrice) {
        params.push(minPrice);
        sql += ` AND price >= $${params.length}`;
      }
      if (maxPrice) {
        params.push(maxPrice);
        sql += ` AND price <= $${params.length}`;
      }
      if (rooms) {
        params.push(rooms);
        sql += ` AND rooms >= $${params.length}`;
      }

      const result = await query(sql);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }
  } else if (req.method === 'POST') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const { title, description, price, rooms: roomCount, address, city, image_url } = req.body;
      
      const result = await query(
        'INSERT INTO rooms (title, description, price, rooms, address, city, image_url, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [title, description, price, roomCount, address, city, image_url, decoded.userId]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating room:', error);
      res.status(500).json({ error: 'Failed to create room' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
