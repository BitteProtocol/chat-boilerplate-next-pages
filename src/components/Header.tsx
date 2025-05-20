'use client';

import ConnectDialog from '@/components/ConnectDialog';
import ManageAccountsDialog from '@/components/ManageAccountsDialog';
import { Button } from '@/components/ui/button';
import { MB_URL } from '@/lib/url';
import { useBitteWallet } from '@bitte-ai/react';
import { useWallet as useSuiWallet } from '@suiet/wallet-kit';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from 'wagmi';

const Header: React.FC = () => {
  const [isConnectModalOpen, setConnectModalOpen] = useState<boolean>(false);
  const { isConnected: isNearConnected, connect } = useBitteWallet();
  const { isConnected } = useAccount();
  const { connected: isSuiConnected } = useSuiWallet();

  const handleSignIn = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <>
       <div className="absolute top-5 left-5">
        <Image src="/bitte.svg" alt="Bitte Logo" width={35} height={35} />
      </div>
    <header className="sticky top-5 right-0 w-[200px] ml-auto mr-5 z-[999] flex gap-2 justify-end items-center">

      <Button
        className="bg-[#27272A] text-[#FAFAFA] hover:bg-[#27272A] hover:bg-opacity-80"
        asChild
      >
        <a href="mailto:paul@bitte.ai">Contact</a>
      </Button>

      {isNearConnected && (
        <Link href={MB_URL.BITTE_WALLET_SETTINGS} target="_blank">
          <Button variant="outline" aria-label="Settings">
            Settings
          </Button>
        </Link>
      )}
      {!isConnected && !isNearConnected && !isSuiConnected && (
        <ConnectDialog
          isOpen={isConnectModalOpen}
          setConnectModalOpen={setConnectModalOpen}
        />
      )}
      {(isConnected || isNearConnected || isSuiConnected) && (
        <ManageAccountsDialog
          isOpen={isConnectModalOpen}
          setConnectModalOpen={setConnectModalOpen}
          isConnected={isConnected}
          isNearConnected={isNearConnected}
          handleSignIn={handleSignIn}
          isSuiConnected={isSuiConnected}
        />
      )}
    </header></>
  );
};

export default Header;
