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
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 py-8 sm:py-12">
          <div className="flex flex-col items-center max-w-2xl w-full relative">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 sm:mb-6">
              <img
                src="/Logo.svg"
                alt="Proovd Logo"
                className="h-8 sm:h-12 w-auto"
              />
            </motion.div>

            {/* Cards Animation Container - Bound by height to fit various screens */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[400px] h-[25vh] sm:h-[35vh] md:h-[40vh] max-h-[380px] flex items-center justify-center mb-4 sm:mb-8">
              {/* Left Green Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="absolute w-[100px] h-[140px] sm:w-[130px] sm:h-[185px] md:w-[170px] md:h-[240px] bg-brand-highlight rounded-2xl sm:rounded-3xl shadow-xl transform -rotate-[8deg] -translate-x-[2.8rem] sm:-translate-x-[4rem] md:-translate-x-[5.5rem] translate-y-2 border-[2px] sm:border-[3px] border-white dark:border-brand-bg z-10 overflow-hidden">
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
                className="absolute w-[110px] h-[155px] sm:w-[140px] sm:h-[200px] md:w-[180px] md:h-[255px] bg-white rounded-2xl sm:rounded-3xl shadow-xl transform rotate-[8deg] translate-x-[2.8rem] sm:translate-x-[4rem] md:translate-x-[5.5rem] -translate-y-2 border-[2px] sm:border-[3px] border-brand-primary z-20 overflow-hidden">
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
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="absolute z-30">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-brand-primary w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24"
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
              className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-2 sm:mb-4 tracking-tighter drop-shadow-lg text-center font-display leading-tight">
              It's a Match!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-base sm:text-lg md:text-2xl text-brand-text font-medium leading-relaxed text-center mb-4 sm:mb-8 max-w-sm sm:max-w-md md:max-w-xl">
              Our algorithm matched you with four affiliates
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="w-full flex justify-center">
              <button
                onClick={handleViewMatches}
                className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-dark text-brand-surface-dark font-black py-3 sm:py-4 px-10 rounded-full shadow-xl hover:shadow-brand-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer text-base sm:text-lg uppercase tracking-wider active:scale-95">
                View Matches
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
