
import { put } from '@vercel/blob';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { filename } = req.query;
    const finalFilename = filename || `upload-${Date.now()}.png`;

    // 在 Node.js Serverless 环境中，req 本身就是一个可读流
    // @vercel/blob 的 put 方法可以直接接收流
    const blob = await put(finalFilename, req, {
      access: 'public',
    });

    return res.status(200).json(blob);
  } catch (error: any) {
    console.error('Blob Upload Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Upload failed' 
    });
  }
}
