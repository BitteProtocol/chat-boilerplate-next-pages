import { Copy } from 'lucide-react';
import { Roboto_Mono } from 'next/font/google';
import type { FC } from 'react';

const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

interface WalletAddressProps {
  address: string;
}

const WalletAddress: FC<WalletAddressProps> = ({ address }) => {
  // Shorten the address for display
  const shortenAddress = (addr: string): string => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-5)}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`bg-mb-black-deep p-1.5 rounded-md text-xs text-mb-gray-50 ${roboto_mono.className}`}
      >
        {shortenAddress(address)}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="text-mb-gray-400 hover:text-mb-white-50 transition-colors"
        aria-label="Copy wallet address"
      >
        <Copy size={14} />
      </button>
    </div>
  );
};

export default WalletAddress;
