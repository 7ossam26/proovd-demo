"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation variants for smooth transitions
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function PitchPage() {
  const [mode, setMode] = useState("text"); // 'text' | 'voice'
  const [voiceState, setVoiceState] = useState("ready"); // 'ready' | 'recording' | 'controls'
  const router = useRouter();

  // Wave Bar Configuration
  const bars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const handleNext = () => {
    router.push("/onboarding/idea-breakdown");
  };

  const handleMatchComplete = () => {
    router.push("/founder/campaigns");
  };

  const startRecording = () => {
    setVoiceState("recording");
  };

  const stopRecording = () => {
    setVoiceState("controls");
  };

  const resetVoice = () => {
    setVoiceState("ready");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-brand-bg text-brand-text font-sans">
      {/* Background Elements (derived from voiceMode html) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-brand-accent-green/10 rounded-full blur-[80px]" />
      </div>

      <header className="absolute top-0 w-full p-8 flex justify-center z-20">
        <div className="flex items-center gap-3">
          <img src="/Logo.svg" alt="Proovd Logo" className="h-10 w-auto" />
        </div>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center text-center space-y-8 z-10 mt-16">
        {/* Dynamic Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-white drop-shadow-sm leading-tight">
            Pitch your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-accent-cyan animate-pulse-glow">
              Business Idea
            </span>
          </h1>
          <p className="text-lg md:text-xl text-brand-text-muted font-medium tracking-wide">
            and we'll transform it for Success
          </p>
        </div>

        <AnimatePresence mode="wait">
          {mode === "text" ? (
            <motion.div
              key="text-mode"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full space-y-8">
              <div className="relative group">
                <textarea
                  className="w-full h-72 p-6 pb-20 rounded-[2rem] bg-brand-surface/40 border border-brand-surface-light/30 text-white placeholder-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none shadow-sm backdrop-blur-sm transition-all duration-300 text-lg leading-relaxed"
                  placeholder="Describe your vision..."
                  autoFocus
                />
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <button
                    onClick={() => setMode("voice")}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-brand-text-muted hover:text-brand-primary hover:bg-brand-surface/50 transition-all duration-300 group/btn">
                    <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">
                      mic
                    </span>
                    <span className="font-medium">Switch to Voice</span>
                  </button>
                </div>
              </div>
              <Button
                onClick={handleNext}
                fullWidth
                size="lg"
                className="py-4 text-lg font-bold shadow-[0_0_15px_rgba(69,216,145,0.2)] hover:shadow-[0_0_25px_rgba(69,216,145,0.4)] rounded-xl">
                Transform my Idea
              </Button>
              <p className="text-sm md:text-base text-brand-text-muted/80 font-medium tracking-wide mt-4">
                When you speak your Ideas out loud, you give them{" "}
                <span className="text-brand-primary font-bold">Life</span>.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="voice-mode"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full flex flex-col items-center space-y-12 py-4">
              {/* Voice Interaction Area */}
              <div className="relative flex flex-col items-center justify-center gap-10 w-full min-h-[300px]">
                {/* STATE: READY */}
                {voiceState === "ready" && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative group cursor-pointer"
                    onClick={startRecording}>
                    <div className="absolute inset-0 rounded-full bg-brand-primary/20 blur-2xl scale-75 group-hover:scale-100 transition-transform duration-500" />
                    <div className="absolute inset-0 rounded-full bg-brand-primary/10 blur-3xl scale-90 group-hover:scale-110 transition-transform duration-700 delay-75" />
                    <button className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-[0_20px_50px_-12px_rgba(69,216,145,0.3)] hover:shadow-[0_20px_50px_-12px_rgba(69,216,145,0.5)] flex items-center justify-center transform hover:scale-[1.02] transition-all duration-300">
                      <span className="material-symbols-outlined text-6xl text-white">
                        mic
                      </span>
                    </button>
                  </motion.div>
                )}

                {/* STATE: RECORDING */}
                {voiceState === "recording" && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative group cursor-pointer"
                    onClick={stopRecording}>
                    <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping opacity-50 duration-1000" />
                    <div className="absolute inset-[-20px] bg-brand-primary/5 rounded-full blur-2xl" />
                    <button className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-[0_0_50px_10px_rgba(69,216,145,.5)] bg-gradient-to-br from-brand-primary to-brand-primary-dark border-brand-surface/50 backdrop-blur-sm z-20">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-lg shadow-md transform transition-transform hover:scale-90" />
                    </button>
                  </motion.div>
                )}

                {/* STATE: CONTROLS */}
                {voiceState === "controls" && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="flex items-center justify-center gap-8 md:gap-12">
                    {/* Retry Button */}
                    <button
                      onClick={resetVoice}
                      className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-surface-dark border border-brand-primary/10 hover:border-brand-primary/50 transition-all duration-300 hover:scale-105 shadow-lg shadow-black/20">
                      <span className="material-symbols-outlined text-brand-highlight text-3xl md:text-4xl group-hover:-rotate-180 transition-transform duration-500">
                        refresh
                      </span>
                    </button>

                    {/* Resume/Record Button (Center) */}
                    <div className="relative group">
                      <div className="absolute inset-0 rounded-full bg-brand-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                      <button
                        onClick={startRecording}
                        className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-[#152e1f] to-brand-bg border-2 border-brand-primary shadow-[0_0_15px_rgba(69,216,145,0.2)] group-hover:shadow-[0_0_30px_rgba(69,216,145,0.5)] transition-all duration-300 transform group-hover:scale-105 active:scale-95">
                        <span className="material-symbols-outlined text-brand-primary text-5xl md:text-6xl">
                          mic
                        </span>
                      </button>
                    </div>

                    {/* Confirm Button */}
                    <button
                      onClick={handleNext}
                      className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-surface-dark border border-brand-primary/10 hover:border-brand-primary/50 transition-all duration-300 hover:scale-105 shadow-lg shadow-black/20">
                      <span className="material-symbols-outlined text-brand-highlight text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                        check
                      </span>
                    </button>
                  </motion.div>
                )}

                {/* SHARED: Wave Bars */}
                <div className="h-24 flex items-end justify-center gap-1.5 md:gap-2 w-full max-w-lg px-4 mt-2">
                  {bars.map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 md:w-2 rounded-full bg-gradient-to-t from-brand-secondary to-brand-primary transform origin-bottom"
                      animate={{
                        height:
                          voiceState === "recording"
                            ? [
                              // Dynamic heights for recording
                              Math.random() * 40 + 10,
                              Math.random() * 80 + 20,
                              Math.random() * 40 + 10,
                            ]
                            : voiceState === "controls"
                              ? Math.max(20, Math.sin(i) * 50 + 30) // Static-ish wave for controls
                              : 8, // Flat for ready
                        opacity: voiceState === "recording" ? 1 : 0.5,
                        boxShadow:
                          voiceState === "recording"
                            ? "0 0 10px rgba(69,216,145,0.5)"
                            : "none",
                      }}
                      transition={{
                        duration: voiceState === "recording" ? 0.5 : 1,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: i * 0.05,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Footer / Switch Action */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => {
                    setMode("text");
                    setVoiceState("ready");
                  }}
                  className="flex items-center gap-2 text-brand-highlight hover:text-white transition-colors group">
                  <span className="material-symbols-outlined text-2xl group-hover:-translate-x-1 transition-transform">
                    keyboard
                  </span>
                  <span className="text-lg font-medium border-b border-transparent group-hover:border-white transition-all">
                    Switch to Text
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
