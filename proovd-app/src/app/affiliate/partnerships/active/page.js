"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";

// Mock Data
const activePartnerships = [
  {
    id: 1,
    name: "StyleAI",
    tagline: "Personalized Fashion Assistant",
    link: "https://Styleai.com/ref/john-doe-123",
    assets: ["Product Images", "Email Templates", "Social Media Kit"],
    status: "active",
  },
  {
    id: 2,
    name: "EcoLife Essentials",
    tagline: "Sustainable Home Kit",
    link: "https://ecolife.com/ref/john-doe-123",
    assets: ["Product Images", "Brochure"],
    status: "active",
  },
];

function TerminateModal({ partnership, onClose, onTerminate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-brand-surface border border-brand-surface-light/20 rounded-2xl shadow-2xl p-6 md:p-8">
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
        {/* ... (rest of modal content) ... */}
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
      </motion.div>
    </div>
  );
}

export default function ActivePartnershipsPage() {
  const [terminatingId, setTerminatingId] = useState(null);

  const handleTerminate = (id) => {
    console.log("Terminating", id);
    setTerminatingId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {activePartnerships.map((partner) => (
        <div
          key={partner.id}
          className="bg-brand-surface rounded-2xl shadow-lg border border-brand-border p-6 md:p-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-50" />
          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 rounded-full bg-brand-surface-light/10 flex items-center justify-center border-2 border-brand-surface-light/20 shadow-inner">
                <span className="material-symbols-outlined text-4xl text-brand-text-muted opacity-50">
                  storefront
                </span>
              </div>
            </div>
            <div className="flex-grow space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-brand-text tracking-tight group-hover:text-brand-primary transition-colors">
                    {partner.name}
                  </h2>
                  <p className="text-sm text-brand-text-muted">
                    {partner.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button size="sm" className="w-full md:w-auto">
                    <span className="material-symbols-outlined text-[18px] mr-2">
                      play_arrow
                    </span>{" "}
                    Go to Product Page
                  </Button>
                  <button
                    onClick={() => setTerminatingId(partner.id)}
                    className="text-brand-text-muted hover:text-red-500 transition p-2 hover:bg-brand-surface-light/10 rounded-lg"
                    title="Terminate Partnership">
                    <span className="material-symbols-outlined">block</span>
                  </button>
                </div>
              </div>
              {/* ... assets ... */}
            </div>
          </div>
        </div>
      ))}

      <AnimatePresence>
        {terminatingId && (
          <TerminateModal
            partnership={activePartnerships.find((p) => p.id === terminatingId)}
            onClose={() => setTerminatingId(null)}
            onTerminate={handleTerminate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
