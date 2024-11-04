// app/home/page.js
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import {
  WalletIcon,
  LogOut,
  Wand2,
  Palette,
  Upload,
  Gallery,
} from "lucide-react";
import { formatEther } from "viem";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { toast } from "sonner";
import Marquee from "@/components/ui/marquee";

// Particles Effect
const Particles = () => {
  const colors = ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"];
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(60)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size + "px",
              height: size + "px",
              background: color,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              filter: "blur(1px)",
              opacity: 0.6,
            }}
            animate={{
              y: [-20, 20],
              x: [-20, 20],
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Enhanced Navbar
const Navbar = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
      router.push("/");
    } catch (error) {
      toast.error("Failed to disconnect wallet");
      console.error("Disconnect error:", error);
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="bg-black/50 backdrop-blur-md border-white/10">
        <div className="max-w-[2000px] mx-auto px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <motion.span
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                }}
                className="text-white bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                CharacterForge.ai
              </motion.span>
            </div>

            {/* Wallet Info */}
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-white/70 text-lg">
                {balance &&
                  `${parseFloat(formatEther(balance.value)).toFixed(4)} ${
                    balance.symbol
                  }`}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20">
                  <WalletIcon className="w-5 h-5" />
                  <span className="text-white/90 font-medium">
                    {formatAddress(address)}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-black/90 backdrop-blur-lg border border-white/10"
                >
                  <DropdownMenuItem
                    className="text-red-400 hover:text-red-300 cursor-pointer focus:text-red-300 focus:bg-red-500/10"
                    onClick={handleDisconnect}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect Wallet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Character Templates for Marquee
const characterTemplates = [
  {
    name: "Pixel Warrior",
    description: "8-bit styled warrior character with customizable attributes.",
  },
  {
    name: "Cyber Mage",
    description: "Futuristic spellcaster with techno-magical elements.",
  },
  {
    name: "Space Explorer",
    description: "Sci-fi adventurer ready for galactic missions.",
  },
  {
    name: "Forest Guardian",
    description: "Nature-based protector with mystical abilities.",
  },
];

// Features for Bento Grid
const features = [
  {
    Icon: Wand2,
    name: "Generate Character Solo",
    description:
      "Create unique characters with AI assistance. Perfect for rapid prototyping and exploration.",
    href: "/generate-solo",
    cta: "Start Creating",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {characterTemplates.map((char, idx) => (
          <figure
            key={idx}
            className="relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4
              border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]
              dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]
              transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none
              mx-2"
          >
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium text-white">
                {char.name}
              </figcaption>
              <p className="mt-2 text-xs text-white/60">{char.description}</p>
            </div>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Palette,
    name: "Generate Character + NFT",
    description:
      "Create and mint your character as an NFT in one seamless process.",
    href: "/generate-nft",
    cta: "Create & Mint",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center rotate-45">
            <div className="h-64 w-64 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl animate-pulse" />
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: Upload,
    name: "Upload Images to Generate NFT",
    description:
      "Convert your existing artwork into NFTs with just a few clicks.",
    href: "/upload-nft",
    cta: "Upload Now",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-20 w-20 rounded-lg bg-gradient-to-br from-white/30 to-white/5"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Gallery,
    name: "View Your NFTs",
    description: "Browse your complete NFT collection in one place.",
    href: "/gallery",
    cta: "View Gallery",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2 opacity-20">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="h-12 w-12 rounded-md bg-gradient-to-br from-white/30 to-white/5"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

// Main content component
const MainContent = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </motion.div>
    </div>
  );
};

// Home Page Component
export default function HomePage() {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <Particles />
      <Navbar />
      <main className="relative z-10 flex items-center justify-center min-h-screen pt-28 pb-16">
        <MainContent />
      </main>
    </div>
  );
}
