import Image from 'next/image';
import type { FC } from 'react';

interface WalletBadgeProps {
  networkName: string;
  iconPath: string;
  className?: string;
}

const WalletBadge: FC<WalletBadgeProps> = ({
  networkName,
  iconPath,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center justify-center bg-white rounded-full p-1 h-5 w-5 overflow-hidden">
        <Image
          src={iconPath}
          alt={`${networkName} network`}
          width={16}
          height={16}
        />
      </div>
      <span className="text-xs font-medium text-mb-gray-50">{networkName}</span>
    </div>
  );
};

export default WalletBadge;
