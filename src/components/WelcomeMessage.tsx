import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const WelcomeMessage: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center text-center justify-center text-[#A6AAB0] bg-[#18181A] p-6 rounded-lg max-w-md w-full">
        <Image
          src="/bitte-transparent.svg"
          alt="bitte logo transparent"
          width={40}
          height={40}
        />
        <h1 className="text-xl my-4 font-semibold">
          Embedded Agents Example
        </h1>
        <p className="my-2 max-w-[290px]">
          Easily integrate this chat into your website, with your preferences.
        </p>
        <hr className="w-24 bg-[#505865] border-none h-[1px]" />
        <p className="my-2 max-w-[330px]">
          To test, connect your wallet and ask the Bitte Assistant blockchain
          related prompts.
        </p>
        <hr className="w-24 bg-[#505865] border-none h-[1px]" />
        <div className="flex justify-center gap-8 md:gap-16 mt-4 text-[#FAFAFA] text-sm">
          <a
            href="https://www.bitte.ai/registry"
            target="_blank"
            className="no-underline hover:underline flex gap-2 items-center"
          >
            Browse Agents
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://docs.bitte.ai/agents/embeddable-chat-component"
            target="_blank"
            className="no-underline hover:underline flex gap-2 items-center"
          >
            Documentation
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;