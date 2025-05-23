import { Unlink } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { CopyStandard } from './ui/copy/Copy';
import type { JSX } from 'react';

const CurrentlyConnected = ({
  chainIcon,
  accountId,
  networkBadge,
  network,
  balance,
  action,
}: {
  chainIcon: string;
  accountId: string;
  networkBadge: JSX.Element;
  network: string;
  balance: string | number;
  action: () => void;
}) => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={chainIcon}
          width={40}
          height={40}
          alt="connect-wallet-modal-logo-near"
        />
        <div className="flex flex-col items-start gap-1.5">
          <CopyStandard
            text={accountId}
            textColor="#CBD5E1"
            textSize="sm"
            copySize={14}
            nopadding
            isNearAddress={network === 'NEAR'}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5">
            {networkBadge}
            <small className="text-xs text-mb-gray-300 font-normal">
              {balance} {network}
            </small>
          </div>
        </div>
      </div>
      <Button
        className="px-2.5 border border-mb-red-30 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md text-xs"
        onClick={action}
        aria-label="Disconnect"
      >
        <Unlink size={16} color="#EF4444" />
      </Button>
    </div>
  );
};

export default CurrentlyConnected;
