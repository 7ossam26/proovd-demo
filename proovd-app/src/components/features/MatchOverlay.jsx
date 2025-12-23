"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MatchOverlay({ onComplete, autoTrigger = true }) {
  const [stage, setStage] = useState("hidden"); // hidden -> check_stats -> finding -> matched
  const router = useRouter();

  useEffect(() => {
    if (autoTrigger) {
      // Sequence:
      // 0s: Start
      // 0.5s: Reveal Overlay
      // 3.5s: Show Matched State (Cards/Heart)
      // Wait for user interaction

      const timer1 = setTimeout(() => setStage("finding"), 100);
      const timer2 = setTimeout(() => setStage("matched"), 3500); // Allow some time for "Finding" animation if we had one, or just jump to matched logic.
      // The HTML implies a static "It's a Match" state that fades in.

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [autoTrigger]);

  const handleViewMatches = () => {
    // Navigate to Campaign Settings as requested
    if (onComplete) {
      onComplete();
    } else {
      // Fallback if no handler
      router.push("/founder/campaigns");
    }
  };

  if (stage === "hidden") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-brand-bg/90 backdrop-blur-md">

        <div className="flex min-h-full items-center justify-center p-6">
          <div className="flex flex-col items-center max-w-lg w-full relative">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8">
              <img src="/Logo.svg" alt="Proovd Logo" className="h-12 w-auto" />
            </motion.div>

            {/* Cards Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mb-10">
              {/* Left Green Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute w-[160px] h-[220px] md:w-[180px] md:h-[250px] bg-brand-highlight rounded-3xl shadow-xl transform -rotate-[8deg] -translate-x-[5rem] translate-y-2 border-[3px] border-white dark:border-brand-bg z-10 overflow-hidden">
                <div className="absolute top-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
              </motion.div>

              {/* Right White Card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute w-[170px] h-[230px] md:w-[190px] md:h-[260px] bg-white rounded-3xl shadow-xl transform rotate-[8deg] translate-x-[5rem] -translate-y-2 border-[3px] border-brand-primary z-20 overflow-hidden">
                <div className="absolute top-0 w-full h-full bg-gradient-to-bl from-gray-50/50 to-transparent" />
              </motion.div>

              {/* Heart Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 4px rgba(69, 216, 145, 0.4))",
                    "drop-shadow(0 0 15px rgba(69, 216, 145, 0.8))",
                    "drop-shadow(0 0 4px rgba(69, 216, 145, 0.4))",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute z-30">
                <svg
                  fill="currentColor"
                  height="80"
                  viewBox="0 0 24 24"
                  width="80"
                  className="text-brand-primary"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter drop-shadow-lg text-center font-display">
              It's a Match!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-brand-text font-medium leading-relaxed text-center mb-12 max-w-md">
              Our algorithm matched you with four affiliates
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="w-full flex justify-center">
              <button
                onClick={handleViewMatches}
                className="w-full md:w-auto bg-brand-primary hover:bg-brand-primary-dark text-brand-surface-dark font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-brand-primary/50 transition-all duration-300 transform hover:-translate-y-1 text-lg">
                View Matches
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
