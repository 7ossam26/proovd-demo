"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/Toast";

// Mock Data
const activePartnerships = [
  {
    id: 1,
    name: "StyleAI",
    tagline: "Personalized Fashion Assistant",
    link: "https://Styleai.com/ref/john-doe-123",
    assets: ["Product Images", "Email Templates", "Social Media Kit"],
    status: "active",
    problem:
      "Shoppers struggle to find clothing that fits their style and body type.",
    solution:
      "An AI-powered app that analyzes your preferences and body measurements to recommend perfectly tailored outfits.",
  },
  {
    id: 2,
    name: "EcoLife Essentials",
    tagline: "Sustainable Home Kit",
    link: "https://ecolife.com/ref/john-doe-123",
    assets: ["Product Images", "Brochure"],
    status: "active",
    problem:
      "Households create excessive waste due to single-use plastics and lack of sustainable alternatives.",
    solution:
      "A curated kit of reusable, eco-friendly home essentials designed to reduce waste and promote sustainable living.",
  },
];

function TerminateModal({ partnership, onClose, onTerminate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-brand-surface border border-brand-surface-light/20 rounded-2xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-brand-text-muted hover:text-brand-text transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-brand-text">
            Warning: Partnership Termination
          </h2>
        </div>
        <p className="text-brand-text-muted mb-8 text-lg">
          Are you sure you want to terminate your partnership with{" "}
          <span className="text-brand-text font-semibold">
            {partnership.name}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onTerminate(partnership.id)}>
            Terminate Partnership
          </Button>
        </div>
      </div>
    </div>
  );
}

function PartnershipCard({ partner, onTerminate }) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(partner.link);
    setShowToast(true);
  };

  return (
    <div className="bg-brand-surface rounded-2xl shadow-lg border border-brand-border p-8 relative overflow-hidden transition-all duration-300">
      {showToast && (
        <Toast
          message="Link copied to clipboard!"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 relative z-10">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-brand-surface-light/10 flex items-center justify-center border border-brand-surface-light/20 shadow-inner">
            <span className="material-symbols-outlined text-3xl text-brand-text-muted opacity-50">
              storefront
            </span>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {partner.name}
              </h2>
              <p className="text-brand-text-muted">{partner.tagline}</p>
            </div>
            <div className="flex items-center gap-3 relative">
              <button
                onClick={() => router.push("/product")}
                className="px-4 py-2 bg-brand-primary text-brand-bg font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-lg">
                  play_arrow
                </span>
                Go to Product Page
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  onBlur={() => setTimeout(() => setShowSettings(false), 200)}
                  className="p-2 text-brand-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  <span className="material-symbols-outlined">settings</span>
                </button>
                {showSettings && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-brand-surface border border-brand-border rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                    <button className="w-full text-left px-4 py-3 text-sm text-brand-text hover:bg-white/5 flex items-center gap-3 transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        chat_bubble_outline
                      </span>
                      Message Founder
                    </button>
                    <button
                      onClick={() => onTerminate(partner)}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 flex items-center gap-3 transition-colors border-t border-brand-border/50">
                      <span className="material-symbols-outlined text-lg">
                        close
                      </span>
                      Terminate Partnership
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Link Section */}
          <div className="flex gap-3 mb-8">
            <div className="flex-grow bg-[#0A0F13] border border-brand-border rounded-lg px-4 py-3 text-brand-text/80 text-sm font-mono truncate">
              {partner.link}
            </div>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 border border-brand-border rounded-lg text-white hover:bg-white/5 flex items-center gap-2 font-medium transition-colors whitespace-nowrap">
              <span className="material-symbols-outlined text-lg">
                content_copy
              </span>
              Copy Link
            </button>
          </div>

          {/* Assets Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
              <h3 className="text-white font-semibold">Marketing Assets</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {partner.assets.map((asset, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 border border-brand-border rounded-lg text-brand-text-muted hover:text-white hover:bg-brand-surface-light/5 text-sm transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    download
                  </span>
                  {asset}
                </button>
              ))}
            </div>
          </div>

          {/* Expanded Content */}
          <div
            className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
              isExpanded
                ? "grid-rows-[1fr] opacity-100 mt-8"
                : "grid-rows-[0fr] opacity-0 mt-0"
            }`}>
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8 pt-6 border-t border-brand-border/30">
                <div>
                  <h3 className="text-white font-semibold mb-3">Problem</h3>
                  <p className="text-brand-text-muted leading-relaxed">
                    {partner.problem}
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Solution</h3>
                  <p className="text-brand-text-muted leading-relaxed">
                    {partner.solution}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <button className="px-6 py-3 border border-brand-border rounded-lg text-brand-text hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 w-full md:w-auto justify-center">
                  <span className="material-symbols-outlined text-lg">
                    menu_book
                  </span>
                  Full Story
                </button>
                <button
                  onClick={() => router.push("/product")}
                  className="px-6 py-3 bg-brand-surface-light/10 text-white font-bold rounded-lg hover:bg-brand-surface-light/20 transition-colors flex items-center gap-2 w-full md:w-auto justify-center">
                  <span className="material-symbols-outlined text-lg">
                    play_arrow
                  </span>
                  Go to Product Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center absolute bottom-2 left-0 w-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full text-brand-text-muted hover:text-white hover:bg-white/10 transition-colors">
          <span
            className={`material-symbols-outlined transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}>
            keyboard_arrow_down
          </span>
        </button>
      </div>
    </div>
  );
}

export default function ActivePartnershipsPage() {
  const [terminatingPartner, setTerminatingPartner] = useState(null);

  const handleTerminate = (id) => {
    console.log("Terminating", id);
    setTerminatingPartner(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {activePartnerships.map((partner) => (
        <PartnershipCard
          key={partner.id}
          partner={partner}
          onTerminate={() => setTerminatingPartner(partner)}
        />
      ))}

      <AnimatePresence>
        {terminatingPartner && (
          <TerminateModal
            partnership={terminatingPartner}
            onClose={() => setTerminatingPartner(null)}
            onTerminate={handleTerminate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
