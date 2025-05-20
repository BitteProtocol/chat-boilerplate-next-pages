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
    const upstreamResponse = await fetch(BITTE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BITTE_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    res.statusCode = upstreamResponse.status;

    res.setHeader('Content-Type',
      upstreamResponse.headers.get('Content-Type') || 'application/json');

    if (!upstreamResponse.body) {
      return res.end();
    }

    const reader = upstreamResponse.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }

    res.end();
  } catch (error) {
    console.error('Error in chat API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}