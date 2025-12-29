
import { db } from '@vercel/postgres';

export default async function handler(req: any, res: any) {
  try {
    const client = await db.connect();
    const { rows } = await client.sql`SELECT data FROM app_state WHERE id = 'global_config'`;
    
    if (rows.length === 0) {
      return res.status(200).json(null);
    }
    
    return res.status(200).json(rows[0].data);
  } catch (error: any) {
    console.error('Database Fetch Error:', error);
    return res.status(500).json({ 
      error: 'Database Connection Failed', 
      details: error.message 
    });
  }
}
