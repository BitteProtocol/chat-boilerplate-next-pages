# Chat Boilerplate for Next.js Pages Router

## Overview

This repository provides a working example of a Next.js 15 Pages Router implementation with [@bitte-ai/chat](https://github.com/BitteProtocol/chat).

## Key Considerations

⚠️ **Implementation Notes**

While the App Router implementation in [chat-boilerplate](https://github.com/BitteProtocol/chat-boilerplate/blob/main/src/app/api/chat/route.ts) uses a different approach due to architectural differences, **the proxy implementation in this repository works correctly with Pages Router**.

Our implementation leverages the getReader() method and async recursion to handle streaming responses despite Pages Router's lack of native `ReadableStream` support.

([See Next.js discussion](https://github.com/vercel/next.js/discussions/67026#discussioncomment-9819996) for more details on architectural differences)

## Usage Notes

✅ **Compatible With**
- Your own external API endpoints (for custom agent implementations)
- EVM blockchain connections
- SUI blockchain connections
- NEAR Protocol connections

## Using the BitteAiChat Component

The `BitteAiChat` component can be integrated into your application with multiple blockchain connections:

```tsx
import { BitteAiChat } from '@bitte-ai/chat';
import { useBitteWallet } from '@bitte-ai/react';
import { useAccount, useSendTransaction, useSwitchChain } from 'wagmi';

const YourChatComponent = () => {
  // For NEAR connections
  const { selector } = useBitteWallet();
  const [wallet, setWallet] = useState<Wallet>();

  // For EVM connections via wagmi
  const { address, chainId } = useAccount();
  const { sendTransaction } = useSendTransaction();
  const { switchChain } = useSwitchChain();

  // EVM adapter
  const evmAdapter = {
    sendTransaction,
    switchChain,
    address,
    chainId,
  };

  return (
    <BitteAiChat
      options={{
        agentName: "Your Agent Name",
        agentImage: "/your-agent-image.svg",
        colors: {
          generalBackground: '#18181A',
          messageBackground: '#000000',
          textColor: '#FFFFFF',
          buttonColor: '#0F172A',
          borderColor: '#18181A',
        },
      }}
      wallet={{
        near: {
          wallet: wallet, // Your NEAR wallet instance
        },
        evm: evmAdapter, // Your EVM adapter
        // sui: { /* SUI wallet configuration */ }
      }}
      agentId="your-agent-id"
      apiUrl="/api/chat"
      historyApiUrl="/api/history"
    />
  );
};
```

## API Proxy Implementation

Create an API route at `pages/api/chat.ts` to proxy requests to the Bitte AI backend:

```typescript
// pages/api/chat.ts
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

    // Copy relevant headers
    for (const [key, value] of Object.entries(upstreamResponse.headers)) {
      if (key.toLowerCase() !== 'content-encoding') {
        res.setHeader(key, value as string);
      }
    }

    // Handle streaming response
    if (!upstreamResponse.body) {
      return res.end();
    }

    // Stream the response
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
```

## Environment Setup

Create a `.env.local` file with your Bitte API key:

```
BITTE_API_KEY=your-api-key-here
```

⚠️ **Official Recommendation**

The Vercel team explicitly [recommends using App Router](https://nextjs.org/docs/pages) for new projects. We strongly suggest using the [chat-boilerplate](https://github.com/BitteProtocol/chat-boilerplate) with App Router support instead of this implementation unless you have specific legacy requirements.