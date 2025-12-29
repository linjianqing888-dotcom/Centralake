
import { db } from '@vercel/postgres';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    const client = await db.connect();
    
    // UPSERT pattern: insert or update if exists
    await client.sql`
      INSERT INTO app_state (id, data) 
      VALUES ('global_config', ${JSON.stringify(data)})
      ON CONFLICT (id) 
      DO UPDATE SET data = EXCLUDED.data;
    `;
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update cloud storage' });
  }
}
