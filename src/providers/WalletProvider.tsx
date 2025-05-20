'use client';

import { BitteWalletContextProvider } from '@bitte-ai/react';
import { WalletProvider as SuietWalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

type WalletProviderProps = {
  children: React.ReactNode;
};

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <BitteWalletContextProvider>
      <SuietWalletProvider autoConnect={false}>{children}</SuietWalletProvider>
    </BitteWalletContextProvider>
  );
};

export default WalletProvider;
