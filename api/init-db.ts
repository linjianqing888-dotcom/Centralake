
import { db } from '@vercel/postgres';

export default async function handler(req: any, res: any) {
  try {
    const client = await db.connect();
    // 执行建表语句
    await client.sql`
      CREATE TABLE IF NOT EXISTS app_state (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL
      );
    `;
    return res.status(200).json({ success: true, message: 'Table initialized successfully' });
  } catch (error: any) {
    console.error('Initialization Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to initialize database' });
  }
}
