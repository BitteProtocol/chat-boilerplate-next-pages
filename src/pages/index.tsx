"use client"


import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Main from "@/components/Main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
     <Header />
     <Main />
    </div>
  );
}
