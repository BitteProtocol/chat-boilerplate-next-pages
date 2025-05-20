import type { NextApiRequest, NextApiResponse } from 'next';

const {
  BITTE_API_KEY,
  BITTE_API_URL = 'https://ai-runtime-446257178793.europe-west1.run.app/chat',
} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
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

    // Make the upstream request
    const upstreamResponse = await fetch(`${BITTE_API_URL}`, requestInit);
    
    // Set status code from upstream
    res.statusCode = upstreamResponse.status;
    
    // Copy relevant headers from upstream response
    for (const [key, value] of Object.entries(upstreamResponse.headers)) {
      // Skip content-encoding as it might cause issues
      if (key.toLowerCase() !== 'content-encoding') {
        res.setHeader(key, value as string);
      }
    }

    // Ensure we're sending the proper content type
    res.setHeader('Content-Type', upstreamResponse.headers.get('Content-Type') || 'application/json');
    
    // Handle streaming response
    if (!upstreamResponse.body) {
      return res.end();
    }

    // Stream the response body
    const reader = upstreamResponse.body.getReader();
    
    // This function will be called recursively to read chunks
    async function readChunk() {
      const { done, value } = await reader.read();
      
      if (done) {
        return res.end();
      }
      
      // Write chunk to response and continue
      res.write(value);
      await readChunk();
    }
    
    await readChunk();
    
  } catch (error) {
    console.error('Error in chat API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 