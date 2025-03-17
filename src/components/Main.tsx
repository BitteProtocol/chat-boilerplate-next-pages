"use client";

import { BitteAiChat } from "@bitte-ai/chat";
import { useBitteWallet, Wallet } from "@bitte-ai/react";
import { useEffect, useState } from "react";
import WelcomeMessage from "./WelcomeMessage";

const bitteAgent = {
  id: "bitte-assistant",
  name: "Bitte Assistant",
  description:
    "Bitte assistant for interacting with NFTs and Fungible Tokens (FTs) on NEAR Protocol.  Users can query, mint, transfer NFTs, transfer FTs, create drops, and swap tokens.",
  verified: true,
  image: "/bitte.svg",
};

const Main: React.FC = () => {
  const { selector } = useBitteWallet();
  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    const fetchWallet = async () => {
      const walletInstance = await selector.wallet();
      setWallet(walletInstance);
    };

    if (selector) fetchWallet();
  }, [selector]);

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
    <main className="flex flex-col items-center gap-8 max-w-5xl mx-auto my-4 md:my-8">
      <div className="h-[calc(100vh-114px)] lg:h-[calc(100vh-180px)] w-full">
        <BitteAiChat
          options={chatOptions}
          agentId={bitteAgent.id}
          wallet={{ near: { wallet } }}
          apiUrl="/api/chat"
        />
      </div>
    </main>
  );
};

export default Main;
