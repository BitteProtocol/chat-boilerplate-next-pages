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

    // Copy status code
    res.statusCode = upstreamResponse.status;

    // Copy content type
    res.setHeader('Content-Type',
      upstreamResponse.headers.get('Content-Type') || 'application/json');

    // If there's no body, end the response
    if (!upstreamResponse.body) {
      return res.end();
    }

    // Stream the response
    const reader = upstreamResponse.body.getReader();

    // Process one chunk at a time
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }

    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}