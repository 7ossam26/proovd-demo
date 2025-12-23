"use client";

import { useState, useRef } from "react";
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

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  // Calculate savings based on optional cards filled
  // Assuming we track this locally or receive it. For now, defaulting to 0 as request didn't specify logic source.
  const optionalCardsFilled = 0;
  const potentialSavingsPerCard = 10;
  const currentSavings = optionalCardsFilled * potentialSavingsPerCard;

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
      <div className="bg-brand-surface rounded-[2rem] p-6 shadow-lg hover:border-brand-primary transition-all duration-300 h-full relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(69,216,145,0.15)] bg-opacity-80 backdrop-blur-sm border border-transparent">
        {/* Badge - Repositioned to be a pill inside the card */}
        <div
          className={`absolute top-5 right-5 ${
            isRequired
              ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
              : "bg-brand-surface-light/10 text-brand-text/60 border-white/5"
          } text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border backdrop-blur-sm z-10`}>
          {isRequired ? "Required" : "Optional"}
        </div>

        <div className="mb-4 mt-2">
          <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-primary transition-colors pr-16">
            {title}
          </h2>
          <p className="text-brand-text/70">
            {subtitle}
            {isAiFilled && (
              <span className="text-brand-primary text-[10px] font-bold bg-brand-primary/10 px-2 py-0.5 rounded-full ml-1 inline-block border border-brand-primary/20">
                AI FILLED
              </span>
            )}
          </p>
        </div>

        <div className="flex-grow bg-brand-surface-light/5 rounded-2xl flex items-center justify-center min-h-[280px] group-hover:bg-brand-primary/5 transition-all duration-300 relative">
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

      {/* Header - Full Width Status Bar */}
      <header className="w-full px-4 md:px-10 py-6 z-10">
        <div className="w-full bg-brand-surface text-white rounded-2xl p-4 md:px-8 md:py-5 shadow-lg border border-brand-surface-light/20 relative overflow-hidden backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          {/* Progress Section */}
          <div className="flex-1 w-full md:w-auto flex items-center gap-4 md:gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-text/80 whitespace-nowrap">
              Your Savings
            </span>
            <div className="relative w-full h-3 bg-brand-surface-light/10 rounded-full overflow-hidden flex shadow-inner">
              {/* Background Sections representing stations */}
              <div className="flex-1 border-r border-brand-bg/30 last:border-0 h-full"></div>
              <div className="flex-1 border-r border-brand-bg/30 last:border-0 h-full"></div>
              <div className="flex-1 h-full"></div>

              {/* Active Progress Bar */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-primary to-brand-secondary shadow-[0_0_10px_rgba(69,216,145,0.4)] transition-all duration-700 ease-out"
                style={{ width: `${(optionalCardsFilled / 3) * 100}%` }}
              />
            </div>
            {/* Steps Indicator */}
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i < optionalCardsFilled
                      ? "bg-brand-primary shadow-[0_0_5px_rgba(69,216,145,0.6)]"
                      : "bg-brand-surface-light/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Amount Section */}
          <div className="flex items-center gap-4 pl-0 md:pl-6 md:border-l border-brand-surface-light/10">
            <div className="text-right">
              <div className="text-3xl font-bold text-brand-primary tracking-tight leading-none tabular-nums">
                ${currentSavings}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-brand-text/60 font-medium mt-1">
                Saved
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-grow flex flex-col justify-center relative z-0">
        {/* Navigation Controls Hint */}
        <div className="w-full flex justify-end items-center mb-4 px-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 bg-brand-surface/50 p-2 rounded-full border border-white/5 backdrop-blur-sm">
            <span className="text-xs text-brand-text/60 font-medium uppercase tracking-wider pl-3 pr-2">
              Navigate
            </span>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                className="w-8 h-8 rounded-full border border-brand-surface-light/20 bg-brand-surface flex items-center justify-center hover:bg-brand-primary hover:text-brand-bg hover:border-brand-primary transition-all duration-300 text-brand-text-muted active:scale-95">
                <span className="material-symbols-outlined text-lg">
                  chevron_left
                </span>
              </button>
              <button
                onClick={scrollRight}
                className="w-8 h-8 rounded-full border border-brand-surface-light/20 bg-brand-surface flex items-center justify-center hover:bg-brand-primary hover:text-brand-bg hover:border-brand-primary transition-all duration-300 text-brand-text-muted active:scale-95">
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling List */}
        <div className="relative w-full overflow-hidden pb-10">
          {/* Hide scrollbar with styles */}
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar gap-6 px-6 md:px-10 snap-x snap-mandatory items-stretch min-w-full pb-8 pt-4">
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
