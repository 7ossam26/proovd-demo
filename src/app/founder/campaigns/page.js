"use client";

import { Button } from "@/components/ui/Button";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CampaignSettingsPage() {
  const [duration, setDuration] = useState(1); // 1 to 4 steps
  const router = useRouter();
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const handleUpdate = () => {
    router.push("/founder/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 font-sans">
      <header className="mb-14">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white leading-tight">
          Your Idea has been sent <br className="hidden md:block" />
          out to your four matches
        </h1>
        <p className="text-brand-text-muted font-medium text-lg">
          In the meantime Please set your...
        </p>
      </header>

      {/* Duration Slider */}
      <section className="mb-14">
        <div className="flex justify-between items-end mb-6">
          <label className="block text-xl font-semibold text-white">
            Campaign Duration
          </label>
          <span className="text-brand-primary font-bold text-lg">
            {["1 weeks", "2 weeks", "3 weeks"][duration - 1]}
          </span>
        </div>
        <div className="relative w-full h-16 flex items-center select-none px-2 mt-4">
          <div className="absolute left-0 right-0 h-2 bg-brand-surface-light/10 rounded-full top-1/2 -translate-y-1/2">
            <div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-primary-dark transition-all duration-500 ease-out rounded-full shadow-[0_0_15px_rgba(69,216,145,0.3)]"
              style={{ width: `${((duration - 1) / 2) * 100}%` }}
            />
          </div>
          <div className="absolute w-full left-0 flex justify-between px-0 top-1/2 -translate-y-1/2">
            {[1, 2, 3].map((step, index) => (
              <div
                key={step}
                onClick={() => setDuration(step)}
                className="relative z-10 flex flex-col items-center cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${step <= duration
                    ? "bg-brand-primary shadow-[0_0_10px_rgba(69,216,145,0.5)]"
                    : "bg-brand-surface-light/30"
                    } ${step === duration
                      ? "w-6 h-6 border-4 border-brand-bg scale-110 shadow-[0_0_20px_rgba(69,216,145,0.4)]"
                      : "group-hover:bg-brand-primary/60"
                    }`}
                />
                <span
                  className={`absolute top-8 whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${step === duration
                    ? "text-brand-primary"
                    : "text-brand-text-muted/60"
                    }`}>
                  {["1 weeks", "2 weeks", "3 weeks"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Perception */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <label className="block text-xl font-semibold text-white">
            Brand Perception
          </label>
          <span className="material-symbols-outlined text-brand-text-muted text-lg cursor-help hover:text-brand-primary transition-colors">
            info
          </span>
        </div>
        <div className="relative group">
          <textarea
            className="w-full h-56 bg-transparent border border-brand-surface-light/20 rounded-2xl p-6 text-base text-white placeholder-brand-text-muted/60 focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none transition-all duration-300 group-hover:border-brand-surface-light/40 shadow-none pb-20 custom-scrollbar"
            placeholder="Describe your vision..."
          />
        </div>
      </section>

      {/* Incentives */}
      <section className="mb-14 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Incentives</h2>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full border border-brand-surface-light/20 hover:bg-brand-surface-light/10 text-brand-text-muted hover:text-white transition-colors active:scale-95">
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full border border-brand-surface-light/20 hover:bg-brand-surface-light/10 text-brand-text-muted hover:text-white transition-colors active:scale-95">
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
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
          className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 hide-scrollbar snap-x snap-mandatory">
          {/* Card 1 */}
          <div className="min-w-[85%] sm:min-w-[400px] border-2 border-dashed border-brand-surface-light/20 rounded-2xl p-6 md:p-8 bg-brand-surface-light/5 hover:border-brand-surface-light/40 transition-colors snap-center relative">
            <div className="mb-5">
              <label className="block text-xs uppercase tracking-wider text-brand-text-muted font-bold mb-2">
                Incentive Title
              </label>
              <input
                type="text"
                className="w-full bg-brand-surface border border-brand-surface-light/20 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder-brand-text-muted/50"
              />
            </div>
            <div className="mb-5">
              <label className="block text-xs uppercase tracking-wider text-brand-text-muted font-bold mb-2">
                Incentive Description
              </label>
              <input
                type="text"
                className="w-full bg-brand-surface border border-brand-surface-light/20 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder-brand-text-muted/50"
              />
            </div>
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-wider text-brand-text-muted font-bold mb-2">
                Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-brand-surface border border-brand-surface-light/20 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all pr-8 placeholder-brand-text-muted/50"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-muted font-medium">
                  $
                </span>
              </div>
            </div>
            <button className="w-full py-3 px-4 rounded-lg bg-brand-surface-dark text-white font-medium hover:bg-brand-primary hover:text-brand-bg transition-all duration-300 shadow-md">
              Add
            </button>
          </div>

          {/* Add New Card */}
          <div className="min-w-[85%] sm:min-w-[400px] border-2 border-dashed border-brand-surface-light/10 rounded-2xl p-6 md:p-8 bg-transparent hover:border-brand-surface-light/30 transition-colors snap-center flex flex-col justify-center items-center cursor-pointer group opacity-50 hover:opacity-100">
            <div className="w-16 h-16 rounded-full bg-brand-surface-light/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-brand-text-muted text-3xl">
                add
              </span>
            </div>
            <span className="text-brand-text-muted font-semibold text-lg">
              Add Another Incentive
            </span>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6 text-white">FAQ's</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-xs uppercase font-bold text-brand-text-muted mb-2 ml-1">
              FAQ title
            </label>
            <input
              type="text"
              className="w-full bg-transparent border border-brand-surface-light/20 rounded-xl px-5 py-4 text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all text-base placeholder-brand-text-muted/50"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-brand-text-muted mb-2 ml-1">
              FAQ answer
            </label>
            <textarea className="w-full h-32 bg-transparent border border-brand-surface-light/20 rounded-xl px-5 py-4 text-white focus:ring-1 focus:ring-brand-primary focus:border-brand-primary resize-none transition-all text-base placeholder-brand-text-muted/50" />
          </div>
          <button className="w-full py-4 px-6 rounded-xl bg-brand-surface-dark text-white font-semibold hover:bg-brand-primary hover:text-brand-bg transition-colors duration-300 shadow-md">
            Add to FAQ list
          </button>
        </div>
      </section>

      {/* FAQ Accordion List - Simplified Static for MVP */}
      <section className="mb-20 border-t border-brand-surface-light/10 pt-8">
        <div className="divide-y divide-brand-surface-light/10">
          <details className="group py-5 cursor-pointer">
            <summary className="list-none flex justify-between items-center font-medium">
              <span className="text-brand-text-muted text-lg group-hover:text-brand-primary transition-colors">
                How do I know which affiliates will promote my idea?
              </span>
              <span className="material-symbols-outlined text-brand-text-muted group-hover:text-brand-primary transition group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <p className="text-brand-text-muted/70 mt-3 pl-1">
              Affiliates are selected based on their audience demographics and
              past performance...
            </p>
          </details>
          {/* Add more details as needed */}
        </div>
      </section>

      <div className="pb-16">
        <button
          onClick={handleUpdate}
          className="w-full py-5 rounded-xl bg-gradient-brand text-white text-lg md:text-xl font-bold shadow-lg hover:shadow-brand-primary/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 uppercase tracking-wide">
          Update Campaign Settings
        </button>
      </div>
    </div>
  );
}
