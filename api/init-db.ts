
import { db } from '@vercel/postgres';

export default async function handler(req: any, res: any) {
  try {
    const client = await db.connect();
    // 确保 app_state 表存在
    await client.sql`
      CREATE TABLE IF NOT EXISTS app_state (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL
      );
    `;
    return res.status(200).json({ 
      success: true, 
      message: 'Infrastructure ready: app_state table verified.' 
    });
  } catch (error: any) {
    console.error('DB Init Error:', error);
    return res.status(500).json({ 
      error: 'Initialization Failed', 
      details: error.message 
    });
  }
}
