import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@near-wallet-selector/modal-ui/styles.css";
import "@bitte-ai/chat/styles.css";
import WagmiConfigProvider, { wagmiAdapter } from "@/providers/WagmiConfigProvider";
import { cookieToInitialState } from 'wagmi';
import { useEffect, useState } from "react";
import type { State } from 'wagmi';

export default function App({ Component, pageProps }: AppProps) {
  const [initialState, setInitialState] = useState<State | undefined>(undefined);

  useEffect(() => {
    // Access cookies on the client side
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('wagmi='))
      ?.split('=')[1];

    if (cookieValue) {
      setInitialState(cookieToInitialState(wagmiAdapter.wagmiConfig, cookieValue));
    }
  }, []);

  return (
    <WagmiConfigProvider initialState={initialState}>
      <Component {...pageProps} />
    </WagmiConfigProvider>
  );
}
