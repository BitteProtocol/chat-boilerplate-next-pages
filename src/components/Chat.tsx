"use client";

import { BitteAiChat } from "@bitte-ai/chat";
import { useBitteWallet, Wallet } from "@bitte-ai/react";
import { useEffect, useState } from "react";
import WelcomeMessage from "./WelcomeMessage";

const bitteAgent = {
  id: "bitte-assistant",
  name: "Bitte Assistant",
  description:
    "Bitte assistant for interacting with NFTs and Fungible Tokens (FTs) on NEAR Protocol. Users can query, mint, transfer NFTs, transfer FTs, create drops, and swap tokens.",
  verified: true,
  image: "/bitte.svg",
};

const Chat = () => {
  const { selector, isConnected, isWalletSelectorSetup } = useBitteWallet();
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);

  useEffect(() => {
    if (!selector) {
      console.log("Selector is not available yet.");
      return;
    }

    console.log("isWalletSelectorSetup:", isWalletSelectorSetup);
    console.log("isConnected:", isConnected);

    const fetchWallet = async () => {
      try {
        // Ensure a wallet is selected
        const selectedWalletId = selector.store.getState().selectedWalletId;
        if (!selectedWalletId) {
          console.warn("No wallet selected.");
          return;
        }

        const walletInstance = await selector.wallet();
        if (!walletInstance) {
          console.warn("Wallet instance is undefined.");
          return;
        }

        console.log("Wallet instance:", walletInstance);
        setWallet(walletInstance);
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    };

    fetchWallet();
  }, [selector, isConnected, isWalletSelectorSetup]);

  // if (!wallet) return <p>Please Connect Wallet.</p>;

  const chatOptions = {
    agentImage: bitteAgent.image,
    agentName: bitteAgent.name,
    customComponents: { welcomeMessageComponent: <WelcomeMessage /> },
    colors: {
      generalBackground: "#18181A",
      messageBackground: "#0A0A0A",
      textColor: "#FAFAFA",
      buttonColor: "#000000",
      borderColor: "#334155",
    },
  };

  return (
    <BitteAiChat
      options={chatOptions}
      agentId={bitteAgent.id}
      wallet={{ near: { wallet } }}
      apiUrl="/api/chat"
    />
  );
};

export default Chat;
