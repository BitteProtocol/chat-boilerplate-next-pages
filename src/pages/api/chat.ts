import type { NextApiRequest, NextApiResponse } from 'next';

const {
  BITTE_API_KEY,
  BITTE_API_URL = 'https://ai-runtime-446257178793.europe-west1.run.app/chat',
} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    const requestInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BITTE_API_KEY}`,
      },
    };

    const upstreamResponse = await fetch(`${BITTE_API_URL}`, requestInit);
    
    res.statusCode = upstreamResponse.status;
    
    for (const [key, value] of Object.entries(upstreamResponse.headers)) {
      if (key.toLowerCase() !== 'content-encoding') {
        res.setHeader(key, value as string);
      }
    }

    res.setHeader('Content-Type', upstreamResponse.headers.get('Content-Type') || 'application/json');
    
    if (!upstreamResponse.body) {
      return res.end();
    }

    const reader = upstreamResponse.body.getReader();
    
    async function readChunk() {
      const { done, value } = await reader.read();
      
      if (done) {
        return res.end();
      }
      
      res.write(value);
      await readChunk();
    }
    
    await readChunk();
    
  } catch (error) {
    console.error('Error in chat API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 