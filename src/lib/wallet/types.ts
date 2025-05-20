import type { Dispatch, SetStateAction } from 'react';

export interface WalletConnectorProps {
  setConnectModalOpen?: Dispatch<SetStateAction<boolean>>;
  isManageDialog?: boolean;
}

export interface WalletInfo {
  name: string;
  icon: string;
  downloadUrl?: string;
}
