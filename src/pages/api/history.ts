import type { NextApiRequest, NextApiResponse } from 'next';

const {
    BITTE_API_KEY,
    BITTE_API_URL = 'https://ai-runtime-446257178793.europe-west1.run.app',
} = process.env;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        let url = `${BITTE_API_URL}/history`;
        if (req.method === 'GET' && req.query.id) {
            url += `?id=${req.query.id}`;
        }

        const requestInit = {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${BITTE_API_KEY}`,
            },
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
        };

        const response = await fetch(url, requestInit);
        const data = await response.json();

        return res.status(response.status).json(data);
    } catch (error) {
        console.error('Error in history API route:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}