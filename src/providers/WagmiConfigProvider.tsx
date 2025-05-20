'use client';

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  arbitrum,
  avalanche,
  base,
  gnosis,
  mainnet,
  mode,
  optimism,
  polygon,
  sepolia,
} from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, type cookieToInitialState } from 'wagmi';
import { cookieStorage, createStorage } from 'wagmi';
import WalletProvider from './WalletProvider';

const queryClient = new QueryClient();
type WagmiConfigProviderProps = {
  children: React.ReactNode;
  initialState: ReturnType<typeof cookieToInitialState>;
};

const networks = [
  mainnet,
  arbitrum,
  base,
  polygon,
  optimism,
  avalanche,
  gnosis,
  sepolia,
];

const metadata = {
  name: 'bitte AI',
  description: 'Interact with blockchains usign AI',
  url: 'https://bitte.ai', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// Create a type-safe storage object from cookieStorage
const storage = createStorage({
  storage: cookieStorage,
  key: 'wagmi',
});

export const wagmiAdapter = new WagmiAdapter({
  storage,
  ssr: true,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  networks,
});

createAppKit({
  adapters: [wagmiAdapter],
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  networks: [
    mainnet,
    arbitrum,
    base,
    polygon,
    optimism,
    avalanche,
    gnosis,
    mode,
    sepolia,
  ],
  defaultNetwork: mainnet,
  metadata: metadata,
  featuredWalletIds: [
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
  ],
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: false,
    socials: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#141418',
    '--w3m-accent': '#141418',
    '--w3m-font-size-master': '18',
  },
});

const WagmiConfigProvider = ({
  children,
  initialState,
}: WagmiConfigProviderProps) => {
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        <WalletProvider>{children}</WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiConfigProvider;
