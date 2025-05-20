import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@bitte-ai/chat/dist/style.css" />
      </Head>
      <body className="antialiased antialiased dark min-h-[calc(100vh-64px)] bg-[#18181A]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
