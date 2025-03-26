// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";

const { BITTE_API_KEY, BITTE_API_URL = "https://api.bitte.ai/v1" } = process.env;

export const config = {
  api: {
    responseLimit: false,
    bodyParser: false, // Required for streaming
    externalResolver: true, // Important for streaming
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const upstreamResponse = await fetch(`${BITTE_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
        Authorization: `Bearer ${BITTE_API_KEY}`,
      },
      body: req.body, // Stream the incoming request directly
    });

    // Set response headers from upstream (except content-encoding)
    upstreamResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") {
        res.setHeader(key, value);
      }
    });

    res.status(upstreamResponse.status);

    // Properly pipe the stream
    if (upstreamResponse.body) {
      // Node.js 18+ way to pipe the stream
      return await new Response(upstreamResponse.body).body?.pipeTo(
        new WritableStream({
          write(chunk) {
            res.write(chunk);
          },
          close() {
            res.end();
          },
        })
      );
    }

    throw new Error("No response body from upstream");
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}