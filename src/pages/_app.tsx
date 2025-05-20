import WalletProvider from "@/providers/WalletProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@near-wallet-selector/modal-ui/styles.css";
import "@bitte-ai/chat/styles.css";

export default function App({ Component, pageProps }: AppProps) {

  console.log("....")
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}
