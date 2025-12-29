
import { put } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || `upload-${Date.now()}.png`;

    // The request body contains the binary file data
    const blob = await put(filename, request.body as any, {
      access: 'public', // Makes the file accessible via URL
    });

    return new Response(JSON.stringify(blob), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Blob Upload Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
