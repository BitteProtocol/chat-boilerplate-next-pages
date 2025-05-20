'use client';

import { useIsClient } from '@/hooks/useIsClient';
import { BitteAiChat, BitteWidgetChat } from '@bitte-ai/chat';
import { type Wallet, useBitteWallet } from '@bitte-ai/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount, useSendTransaction, useSwitchChain } from 'wagmi';

const bitteAgent = {
  id: 'bitte-defi',
  name: 'Bitte Assistant',
  description:
    'Bitte assistant for interacting with NFTs and Fungible Tokens (FTs) on NEAR Protocol.  Users can query, mint, transfer NFTs, transfer FTs, create drops, and swap tokens.',
  verified: true,
  image: '/bitte.svg',
};

const chatColors = {
  generalBackground: '#18181A',
  messageBackground: '#000000',
  textColor: '#FFFFFF',
  buttonColor: '#0F172A',
  borderColor: '#18181A',
};

const Main: React.FC = () => {
  const { selector } = useBitteWallet();
  const [wallet, setWallet] = useState<Wallet>();
  const isClient = useIsClient();
  const searchParams = useSearchParams();

  const { address, chainId } = useAccount();
  const { data: hash, sendTransaction } = useSendTransaction();
  const { switchChain } = useSwitchChain();

  const showWidget = searchParams.get('widget') === 'true';

  // Simple adapter that directly passes through the wagmi hooks
  const evmAdapter = {
    sendTransaction,
    switchChain,
    address,
    chainId,
    hash,
  };

  useEffect(() => {
    if (!selector) {
      return;
    }

    const fetchWallet = async () => {
      try {
        // Ensure a wallet is selected
        const selectedWalletId = selector.store.getState().selectedWalletId;
        if (!selectedWalletId) {
          console.warn('No wallet selected.');
          return;
        }

        const walletInstance = await selector.wallet();
        if (!walletInstance) {
          return;
        }

        setWallet(walletInstance);
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };

    fetchWallet();
  }, [selector]);

  const chatProps = {
    options: {
      agentImage: bitteAgent?.image,
      agentName: bitteAgent?.name,
      colors: chatColors,
    },
    wallet: {
      near: {
        wallet: wallet,
      },
      evm: evmAdapter,
    },
    agentId: searchParams.get('agentId') || bitteAgent?.id || 'bitte-assistant',
    apiUrl: '/api/chat',
    historyApiUrl: 'api/history',
  };

  if (!isClient) {
    return null;
  }

  return (
    isClient && (
      <>
        <div className="w-auto md:w-4/5 m-auto flex justify-center min-h-[calc(100vh-264px)]  md:min-h-[calc(100vh-64px)] pt-10 bg-[#18181A]">
          <div className="w-full md:min-h-[calc(100vh-250px)] min-h-[calc(100vh-264px)]   mb-[100px] flex-grow">
            <BitteAiChat {...chatProps} />
          </div>
        </div>

        {showWidget && (
          <BitteWidgetChat
            {...chatProps}
            widget={{
              widgetWelcomePrompts: {
                questions: [
                  'What is the price of the NFT?',
                  'Latest activity of a specific wallet',
                  'Which tokens are trending?',
                ],
                actions: ['Buy NFT', 'Sell NFT', 'Swap NFT'],
              },
              triggerButtonType: 'dark',
            }}
          />
        )}
      </>
    )
  );
};

export default Main;
