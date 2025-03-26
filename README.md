
# chat-boilerplate-next-pages



- this is an live example of a working next.js 15 pages router project with [@bitte-ai/chat](https://github.com/BitteProtocol/chat).
- running a proxy server as done on [chat-boilerplate](https://github.com/BitteProtocol/chat-boilerplate/blob/main/src/app/api/chat/route.ts) , wont work due to [ReadableStream not being supported](https://github.com/vercel/next.js/discussions/67026#discussioncomment-9819996) on Pages Router Apis.
- you can still run this with your own external api (for your agent). It should work.
- we discourage you of using this, because this is a [recommendation of Vercel team](https://nextjs.org/docs/pages) itself.
- we recommend using the chat-boilerplate with App Router support.