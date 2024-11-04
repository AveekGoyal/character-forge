"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sword, Brain, Heart, Zap } from "lucide-react";
import Image from "next/image";

// Stats Component
const StatDisplay = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white/10 rounded-lg p-2 text-center transform transition-transform hover:scale-105">
    <div className="flex justify-center mb-1">
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
    <div className="text-white/60 text-xs sm:text-sm">{label}</div>
    <div className="text-white font-bold">{value}</div>
  </div>
);

// Enhanced 3D Card Component
const Card3D = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleWindowMouseMove = (event) => {
    const xPct = event.clientX / window.innerWidth - 0.5;
    const yPct = event.clientY / window.innerHeight - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-72 h-[450px] rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 shadow-2xl"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 rounded-xl bg-black/90 p-4 flex flex-col items-center justify-between"
      >
        {/* Image Container */}
        <div
          className="w-full h-48 relative rounded-lg overflow-hidden mb-4"
          style={{ transform: "translateZ(50px)" }}
        >
          <Image
            src="/char.gif"
            alt="Character Animation"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Title */}
        <div
          className="text-white text-xl font-bold mb-4"
          style={{ transform: "translateZ(25px)" }}
        >
          Master Baiter #1337
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-2 gap-2 w-full"
          style={{ transform: "translateZ(25px)" }}
        >
          <StatDisplay
            icon={Sword}
            label="STR"
            value={85}
            color="text-red-400"
          />
          <StatDisplay
            icon={Zap}
            label="DEX"
            value={92}
            color="text-yellow-400"
          />
          <StatDisplay
            icon={Brain}
            label="INT"
            value={78}
            color="text-blue-400"
          />
          <StatDisplay
            icon={Heart}
            label="VIT"
            value={88}
            color="text-green-400"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Other components remain the same
const GradualText = ({
  text,
  baseColor = "white",
  highlightColor = "#23d5ab",
}) => {
  const characters = text.split("");
  return (
    <div
      className="whitespace-nowrap flex justify-center px-4"
      style={{
        maxWidth: "100%",
        transform: "scale(var(--scale-factor, 1))",
        "--scale-factor": "clamp(0.8, 5vw, 1.2)",
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          style={{
            color: baseColor,
            textShadow: "0 0 10px rgba(255,255,255,0.5)",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(2rem, 2vw, 3.5rem)",
          }}
          animate={{
            color: [baseColor, highlightColor, baseColor],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span
      style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize: "clamp(1rem, 2vw, 1.5rem)",
      }}
      className="text-pink-500 tracking-wider"
    >
      {displayText}
    </span>
  );
};

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

// Enhanced ConnectButton Component with navigation
function ConnectButton() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if window.ethereum exists
    if (typeof window !== "undefined" && window.ethereum) {
      // Check if already connected
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setIsConnected(true);
          router.push("/app/home");
        }
      });

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setIsConnected(true);
          router.push("/app/home");
        } else {
          setIsConnected(false);
        }
      });
    }
  }, [router]);

  return <w3m-button />;
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <style jsx global>{`
        @keyframes rainbow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      <Particles />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-7xl">
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            style={{ perspective: "2000px" }}
          >
            <Card3D />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center space-y-12">
              <GradualText text="CharacterForge.ai" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TypingAnimation text="Forge Your NFT Legacy" />
              </motion.div>

              <ConnectButton />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
