"use client"

import Header from "@/components/Header";
import Main from "@/components/Main";
import WalletProvider from "@/providers/WalletProvider";
import "@bitte-ai/chat/styles.css";
import "@near-wallet-selector/modal-ui/styles.css";

export default function Home() {
  return (

    <WalletProvider>
     <Header />
     <Main />
    </WalletProvider>
  );
}
