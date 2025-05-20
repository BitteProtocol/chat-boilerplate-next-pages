import type { WalletInfo } from '@/lib/wallet/types';
import { X } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';

interface WalletSelectModalProps {
  wallets: WalletInfo[];
  onSelectWallet: (walletName: string) => void;
  onClose: () => void;
  isWalletInstalled: (walletName: string) => boolean;
  connectionError: string | null;
}

const WalletSelectModal: FC<WalletSelectModalProps> = ({
  wallets,
  onSelectWallet,
  onClose,
  isWalletInstalled,
  connectionError,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-mb-gray-700 rounded-xl max-w-md w-full p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-mb-gray-50 hover:text-mb-white-50"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-medium text-mb-white-50 mb-6">
          Select a wallet
        </h3>

        {connectionError && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-md text-xs text-red-400">
            {connectionError}
          </div>
        )}

        <div className="grid gap-3">
          {wallets.map((wallet) => {
            const installed = isWalletInstalled(wallet.name);

            return (
              <div key={wallet.name} className="flex flex-col">
                <button
                  type="button"
                  onClick={() =>
                    installed
                      ? onSelectWallet(wallet.name)
                      : window.open(wallet.downloadUrl, '_blank')
                  }
                  className="flex items-center gap-3 p-3 rounded-md bg-mb-gray-650 hover:bg-mb-blue-30 transition-colors"
                  aria-label={
                    installed
                      ? `Connect to ${wallet.name}`
                      : `Install ${wallet.name}`
                  }
                >
                  <div className="bg-white rounded-full p-1 h-10 w-10 flex items-center justify-center">
                    <Image
                      src={wallet.icon}
                      alt={wallet.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-mb-white-50">
                      {wallet.name}
                    </span>
                    <span className="text-xs text-mb-gray-50">
                      {installed ? 'Connect' : 'Not installed'}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WalletSelectModal;
