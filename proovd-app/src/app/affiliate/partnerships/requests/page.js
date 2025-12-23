"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";

// Mock Data (Same as before)
const requests = [
  {
    id: 1,
    name: "StyleAI",
    tagline: "Personalized Fashion Assistant",
    problem:
      "Shoppers struggle to find clothing that fits their style and body type.",
    solution:
      "An AI-powered app that analyzes your preferences and body measurements to recommend perfectly tailored outfits.",
    commission: "25%",
    payout: "$90 per sale",
    duration: "3 Week Campaign",
    status: "pending",
    effort: "normal",
  },
  {
    id: 2,
    name: "FitTech",
    tagline: "Virtual Fitness Coach",
    commission: "20%",
    payout: "$45 per sale",
    duration: "Ongoing",
    status: "pending",
    effort: "normal",
  },
  {
    id: 3,
    name: "StyleAI (High Effort)",
    tagline: "Personalized Fashion Assistant",
    commission: "25%",
    payout: "$90 per sale",
    duration: "3 Week Campaign",
    status: "pending",
    effort: "high",
  },
];

function RequestCard({ request, onOpenDetail }) {
  if (request.effort === "high") {
    return (
      <div className="bg-brand-surface/10 backdrop-blur-sm rounded-2xl p-10 lg:p-12 shadow-sm relative overflow-hidden border-2 border-[#0d597e] shadow-[0_0_20px_-3px_rgba(13,89,126,0.3)]">
        <div className="mb-6 pt-2">
          <span className="inline-block px-4 py-1.5 border border-sky-400 text-[#C8FCFF] rounded-lg text-xs font-semibold uppercase tracking-wide bg-sky-900/40">
            High effort Pitch
          </span>
        </div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">
              {request.name}
            </h2>
            <p className="text-brand-text opacity-70">{request.tagline}</p>
          </div>
        </div>
        <div className="mb-8">
          <button
            onClick={() => onOpenDetail(request)}
            className="w-full py-4 bg-brand-surface-light/10 border border-brand-surface-light/30 rounded-lg text-base font-bold text-white hover:bg-brand-surface-light/20 transition-all flex items-center justify-center gap-2 group">
            <span className="material-symbols-outlined text-lg text-white group-hover:scale-110 transition-transform">
              content_paste
            </span>
            View Requirements
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <span className="px-6 py-3 bg-sky-900/20 text-[#C8FCFF] border border-[#0d597e] rounded-full text-sm font-medium">
            {request.commission} Commission
          </span>
          <span className="px-6 py-3 bg-sky-900/20 text-[#C8FCFF] border border-[#0d597e] rounded-full text-sm font-medium">
            {request.payout}
          </span>
          <span className="px-6 py-3 bg-sky-900/20 text-[#C8FCFF] border border-[#0d597e] rounded-full text-sm font-medium">
            {request.duration}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-surface rounded-2xl p-10 lg:p-14 shadow-sm border border-brand-border">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-3 text-white">{request.name}</h2>
          <p className="text-brand-text opacity-70 text-lg">
            {request.tagline}
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="text-white hover:text-brand-highlight transition-colors p-3 rounded-full hover:bg-brand-surface/30">
            <span className="material-symbols-outlined">history</span>
          </button>
        </div>
      </div>

      {request.problem && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-brand-highlight">
              Problem
            </h3>
            <p className="text-white leading-relaxed text-base opacity-90">
              {request.problem}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-brand-highlight">
              Solution
            </h3>
            <p className="text-white leading-relaxed text-base opacity-90">
              {request.solution}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <button className="w-full py-4 border border-brand-border rounded-lg text-base font-medium text-brand-text hover:bg-brand-surface-light/10 transition-colors flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-lg">close</span>{" "}
          Reject
        </button>
        <button className="w-full py-4 bg-brand-primary rounded-lg text-base font-bold text-brand-bg hover:opacity-90 transition-opacity flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-lg">
            check_circle
          </span>{" "}
          Accept
        </button>
      </div>

      <button
        onClick={() => onOpenDetail(request)}
        className="w-full py-4 bg-brand-surface-light/10 border border-brand-surface-light/30 text-brand-text rounded-lg text-base font-medium hover:bg-brand-surface-light/20 transition-colors mb-10">
        Explore Further
      </button>

      <div className="flex flex-wrap gap-5 mb-10">
        <span className="px-6 py-3 bg-brand-surface text-brand-highlight border border-brand-surface-light/30 rounded-full text-sm font-medium">
          {request.commission} Commission
        </span>
        <span className="px-6 py-3 bg-brand-surface text-brand-highlight border border-brand-surface-light/30 rounded-full text-sm font-medium">
          {request.payout}
        </span>
        <span className="px-6 py-3 bg-brand-surface text-brand-highlight border border-brand-surface-light/30 rounded-full text-sm font-medium">
          {request.duration}
        </span>
      </div>
    </div>
  );
}

function DetailModal({ request, onClose }) {
  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-brand-bg rounded-[2rem] shadow-2xl w-full max-w-[1100px] relative border border-brand-primary/20 overflow-hidden h-auto max-h-[95vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-brand-text-muted hover:text-white transition-colors z-20">
          <span className="material-symbols-outlined text-3xl">cancel</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-12 h-full overflow-y-auto">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#0D1C12] rounded-[20px] w-full aspect-[16/11] flex items-center justify-center relative overflow-hidden border border-brand-surface-light/10">
              <span className="material-symbols-outlined text- brand-text-muted text-6xl opacity-20">
                play_circle
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-brand-surface/10 rounded-[20px] p-8 pb-10 border border-brand-surface-light/20 shadow-sm">
              <h2 className="text-xl font-bold text-white mb-2">
                {request.name}
              </h2>
              <p className="text-brand-text-muted text-base font-normal">
                {request.tagline}
              </p>
            </div>

            <div className="flex gap-4 mt-auto">
              <Button
                onClick={onClose}
                variant="ghost"
                className="flex-1 bg-brand-surface/20 hover:bg-brand-surface/30">
                Close
              </Button>
              <Button className="flex-1">Accept Campaign</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function RequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {requests.map((req) => (
        <RequestCard
          key={req.id}
          request={req}
          onOpenDetail={setSelectedRequest}
        />
      ))}

      <AnimatePresence>
        {selectedRequest && (
          <DetailModal
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
