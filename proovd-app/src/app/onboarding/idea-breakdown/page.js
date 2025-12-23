"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import MatchOverlay from "@/components/features/MatchOverlay";
import TextBreakdownModal from "./modals/TextBreakdownModal";
import VisualsModal from "./modals/VisualsModal";
import AiInterviewModal from "./modals/AiInterviewModal";

export default function IdeaBreakdownPage() {
  const router = useRouter();
  const [selectedModal, setSelectedModal] = useState(null); // 'problem', 'solution', 'competition', 'visuals', 'ai-interview', 'story'
  const [showMatch, setShowMatch] = useState(false);

  const openModal = (type) => setSelectedModal(type);
  const closeModal = () => setSelectedModal(null);

  const handleNext = () => {
    // Show match overlay explicitly instead of redirecting to pitch
    setShowMatch(true);
  };

  const handleMatchComplete = () => {
    router.push("/founder/campaigns");
  };

  // Card Component for consistency
  const BreakdownCard = ({
    title,
    subtitle,
    icon,
    isRequired,
    isAiFilled,
    onClick,
    type,
  }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex-shrink-0 w-[340px] snap-center outline-none group focus:ring-2 focus:ring-brand-primary/50 rounded-[2rem] cursor-pointer"
      onClick={onClick}>
      <div className="bg-brand-surface rounded-[2rem] p-6 shadow-lg border border-brand-primary/40 hover:border-brand-primary transition-all duration-300 h-full relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(69,216,145,0.15)] bg-opacity-80 backdrop-blur-sm">
        {/* Badge */}
        <div
          className={`absolute top-0 right-0 ${
            isRequired
              ? "bg-brand-primary/20 text-brand-primary border-brand-primary/10"
              : "bg-brand-surface-light/20 text-brand-text-muted border-white/5"
          } text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider border-b border-l`}>
          {isRequired ? "Required" : "Optional"}
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-primary transition-colors">
            {title}
          </h2>
          <p className="text-sm text-brand-text-muted">
            {subtitle}
            {isAiFilled && (
              <span className="text-brand-primary text-[10px] font-bold bg-brand-primary/10 px-2 py-0.5 rounded-full ml-1 inline-block border border-brand-primary/20">
                AI FILLED
              </span>
            )}
          </p>
        </div>

        <div className="flex-grow bg-brand-surface-light/5 rounded-2xl flex items-center justify-center min-h-[280px] border border-dashed border-brand-primary/20 group-hover:bg-brand-primary/5 group-hover:border-brand-primary/40 transition-all duration-300 relative">
          <span className="material-symbols-outlined text-7xl text-brand-primary/40 group-hover:text-brand-primary group-hover:scale-110 transition-all duration-300">
            {icon}
          </span>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="material-symbols-outlined text-brand-primary">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-6 md:p-10 gap-6 z-10">
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="w-12 h-12 rounded-full bg-brand-surface-light/10 flex items-center justify-center text-brand-primary font-black text-2xl border border-brand-primary/20 shadow-lg shadow-brand-primary/10">
            P
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-display">
            PROOVD
          </span>
        </div>

        {/* Stats Card */}
        <div className="bg-brand-surface text-white rounded-xl p-5 w-full md:w-auto md:min-w-[420px] shadow-lg border border-brand-surface-light/20 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm text-brand-text-muted font-medium leading-tight max-w-[220px] pt-1">
              The more you complete the{" "}
              <span className="text-brand-primary font-bold">
                Less you'll Pay!
              </span>
            </p>
            <div className="text-right pl-4">
              <div className="text-3xl font-bold text-brand-primary tracking-tight leading-none">
                $15
              </div>
              <div className="text-[10px] uppercase tracking-widest text-brand-text-muted font-medium mt-1">
                Saved
              </div>
            </div>
          </div>
          <div className="relative pt-2">
            <div className="flex justify-between items-center mb-1 relative z-10">
              <div className="w-3 h-3 rounded-full bg-brand-primary ring-4 ring-brand-primary/20 shadow-[0_0_8px_rgba(69,216,145,0.6)] animate-pulse" />
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < 1 ? "bg-brand-primary/60" : "bg-brand-surface-light/20"
                  }`}
                />
              ))}
            </div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-surface-light/10 rounded-full -translate-y-[2px]">
              <div className="h-full w-[20%] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full shadow-[0_0_10px_rgba(69,216,145,0.4)]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-grow flex flex-col justify-center relative z-0">
        {/* Navigation Controls Hint */}
        <div className="w-full flex justify-end items-center mb-4 px-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 bg-brand-surface/50 p-2 rounded-full border border-white/5 backdrop-blur-sm">
            <span className="text-xs text-brand-text-muted font-medium uppercase tracking-wider pl-3 pr-2">
              Navigate
            </span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-brand-surface-light/20 bg-brand-surface flex items-center justify-center hover:bg-brand-primary hover:text-brand-bg hover:border-brand-primary transition-all duration-300 text-brand-text-muted active:scale-95">
                <span className="material-symbols-outlined text-lg">
                  chevron_left
                </span>
              </button>
              <button className="w-8 h-8 rounded-full border border-brand-surface-light/20 bg-brand-surface flex items-center justify-center hover:bg-brand-primary hover:text-brand-bg hover:border-brand-primary transition-all duration-300 text-brand-text-muted active:scale-95">
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling List */}
        <div className="relative w-full overflow-hidden pb-10">
          <div className="flex overflow-x-auto custom-scrollbar gap-6 px-6 md:px-10 snap-x snap-mandatory items-stretch min-w-full pb-8 pt-4">
            <BreakdownCard
              title="Problem"
              subtitle="Define the problem you are solving"
              icon="checklist"
              isRequired={true}
              isAiFilled={true}
              onClick={() => openModal("problem")}
            />
            <BreakdownCard
              title="Solution"
              subtitle="Explain your proposed solution"
              icon="show_chart"
              isRequired={true}
              isAiFilled={true}
              onClick={() => openModal("solution")}
            />
            <BreakdownCard
              title="Competition"
              subtitle="Analyze your competitors"
              icon="groups"
              isRequired={true}
              onClick={() => openModal("competition")}
            />
            {/* Divider */}
            <div className="flex-shrink-0 flex items-center justify-center w-8">
              <div className="h-2/3 w-[1px] bg-gradient-to-b from-transparent via-brand-surface-light/30 to-transparent" />
            </div>
            <BreakdownCard
              title="Visuals"
              subtitle="Add logos, colors, and branding assets"
              icon="palette"
              isRequired={false}
              onClick={() => openModal("visuals")}
            />
            <BreakdownCard
              title="AI Interview"
              subtitle="Simulate customer discovery"
              icon="smart_toy"
              isRequired={false}
              onClick={() => openModal("ai-interview")}
            />
            <BreakdownCard
              title="Story"
              subtitle="Define your narrative and pitch"
              icon="auto_stories"
              isRequired={false}
              onClick={() => openModal("story")}
            />
            <div className="flex-shrink-0 w-6" /> {/* Spacer */}
          </div>

          {/* Fade Edges */}
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none z-10" />
        </div>
      </main>

      {/* Footer Action */}
      <footer className="w-full max-w-7xl mx-auto pb-8 z-10 px-4 md:px-10 mt-auto">
        <button
          onClick={handleNext}
          className="w-full group relative overflow-hidden rounded-xl py-5 px-6 focus:outline-none focus:ring-4 focus:ring-brand-primary/40 transition-all duration-300 shadow-lg shadow-brand-primary/10 hover:shadow-brand-primary/30">
          <div className="absolute inset-0 bg-brand-surface transition-all duration-300 group-hover:opacity-0" />
          <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <span className="relative z-10 text-white font-bold text-lg tracking-wide flex items-center justify-center gap-2">
            Post Idea to Affiliates
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </span>
        </button>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {(selectedModal === "problem" ||
          selectedModal === "solution" ||
          selectedModal === "competition" ||
          selectedModal === "story") && (
          <TextBreakdownModal
            isOpen={true}
            onClose={closeModal}
            type={selectedModal}
          />
        )}
        {selectedModal === "visuals" && (
          <VisualsModal isOpen={true} onClose={closeModal} />
        )}
        {selectedModal === "ai-interview" && (
          <AiInterviewModal isOpen={true} onClose={closeModal} />
        )}
        {showMatch && <MatchOverlay onComplete={handleMatchComplete} />}
      </AnimatePresence>
    </div>
  );
}
