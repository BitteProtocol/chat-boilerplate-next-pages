"use client";

import dynamic from 'next/dynamic'

const BitteChat = dynamic(() => import('./Chat'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const Main: React.FC = () => {

  return (
    <main className="flex flex-col items-center gap-8 max-w-5xl mx-auto my-4 md:my-8">
      <div className="h-[calc(100vh-114px)] lg:h-[calc(100vh-180px)] w-full">
        <BitteChat />
      </div>
    </main>
  );
};

export default Main;
