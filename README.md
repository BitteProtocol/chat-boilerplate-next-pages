# Chat Boilerplate for Next.js Pages Router

## Overview

This repository provides a working example of a Next.js 15 Pages Router implementation with [@bitte-ai/chat](https://github.com/BitteProtocol/chat).

## Key Considerations

⚠️ **Important Limitations**

The proxy server approach used in [chat-boilerplate](https://github.com/BitteProtocol/chat-boilerplate/blob/main/src/app/api/chat/route.ts) won't work with Pages Router due to:
- Lack of native `ReadableStream` support in Pages Router APIs
- Fundamental architectural differences between routing systems
([See Next.js discussion](https://github.com/vercel/next.js/discussions/67026#discussioncomment-9819996))

## Usage Notes

✅ **Compatible With**
- Your own external API endpoints (for custom agent implementations)

⚠️ **Official Recommendation**

The Vercel team explicitly [recommends using App Router](https://nextjs.org/docs/pages) for new projects. We strongly suggest using the [chat-boilerplate](https://github.com/BitteProtocol/chat-boilerplate) with App Router support instead of this implementation unless you have specific legacy requirements.