import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { BITTE_API_KEY, BITTE_API_URL = "https://api.bitte.ai/v1" } = process.env;

  try {
    // Prepare the request to the upstream API
    const requestInit: RequestInit = {
      method: 'POST',
      body: req.body,
      headers: {
        'Authorization': `Bearer ${BITTE_API_KEY}`,
        // Optionally, you might want to forward content type if needed
        ...(req.headers['content-type'] && {
          'Content-Type': req.headers['content-type']
        }),
      },
    };

    // Make the request to the upstream API
    const upstreamResponse = await fetch(`${BITTE_API_URL}/chat`, requestInit);

    // Prepare headers, removing Content-Encoding
    const headers = Object.fromEntries(upstreamResponse.headers);
    delete headers['content-encoding'];

    // Stream the response back to the client
    res.status(upstreamResponse.status);
    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value);
    }

    // Handle the response body
    const responseBody = await upstreamResponse.arrayBuffer();
    res.send(Buffer.from(responseBody));
  } catch (error) {
    console.error('API request error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}