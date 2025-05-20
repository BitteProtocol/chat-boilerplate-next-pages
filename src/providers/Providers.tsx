'use client';

import type { Config } from 'wagmi';
import { WagmiProvider, type cookieToInitialState } from 'wagmi';
import WalletProvider from './WalletProvider';

type ProvidersProps = {
  children: React.ReactNode;
  config: Config;
  initialState: ReturnType<typeof cookieToInitialState>;
};

const Providers = ({ children, config, initialState }: ProvidersProps) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <WalletProvider>{children}</WalletProvider>
    </WagmiProvider>
  );
};

export default Providers;
