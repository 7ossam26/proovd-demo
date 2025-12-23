"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { Toast } from "@/components/ui/Toast";

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
    updates: [
      { text: "Founder Changed Campaign Duration", icon: "notifications" },
    ],
  },
  {
    id: 2,
    name: "FitTech",
    tagline: "Virtual Fitness Coach",
    problem:
      "People struggle to maintain consistent workout routines and track progress effectively without guidance.",
    solution:
      "An intelligent virtual coach that creates personalized workout plans and tracks your form in real-time.",
    commission: "20%",
    payout: "$45 per sale",
    duration: "Ongoing",
    status: "pending",
    effort: "normal",
    updates: [
      { text: "New Campaign Asset Added", icon: "add_photo_alternate" },
    ],
  },
  {
    id: 3,
    name: "StyleAI (High Effort)",
    tagline: "Personalized Fashion Assistant",
    problem:
      "Shoppers struggle to find clothing that fits their style and body type.",
    solution:
      "An AI-powered app that analyzes your preferences and body measurements to recommend perfectly tailored outfits.",
    commission: "25%",
    payout: "$90 per sale",
    duration: "3 Week Campaign",
    status: "pending",
    effort: "high",
    updates: [
      { text: "Founder Changed Campaign Duration", icon: "notifications" },
    ],
  },
];

function RequestCard({ request, onOpenDetail }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardClasses =
    request.effort === "high"
      ? "bg-brand-surface/10 backdrop-blur-sm rounded-2xl p-10 lg:p-12 shadow-sm relative overflow-hidden border-2 border-[#0d597e] shadow-[0_0_20px_-3px_rgba(13,89,126,0.3)] transition-all duration-300"
      : "bg-brand-surface rounded-2xl p-10 lg:p-14 shadow-sm border border-brand-border transition-all duration-300";

  return (
    <div className={cardClasses}>
      {/* Header Section */}
      <div className="flex flex-col mb-4">
        {request.effort === "high" && (
          <div className="mb-6 pt-2">
            <span className="inline-block px-4 py-1.5 border border-sky-400 text-[#C8FCFF] rounded-lg text-xs font-semibold uppercase tracking-wide bg-sky-900/40">
              High effort Pitch
            </span>
          </div>
        )}
        <div className="flex justify-between items-start">
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              {request.name}
            </h2>
            <p className="text-brand-text opacity-70 text-lg">
              {request.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Centered Arrow Button */}
      <div className="flex justify-center -mb-4 mt-4 relative z-10 w-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white hover:text-brand-highlight transition-colors p-2 rounded-full hover:bg-white/10 cursor-pointer">
          <span className="material-symbols-outlined text-4xl animate-bounce-slow">
            {isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 mt-8 pt-4 border-t border-white/5">
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

          {request.effort === "high" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <button className="w-full py-4 border border-brand-border rounded-lg text-base font-medium text-brand-text hover:bg-brand-surface-light/10 hover:text-white transition-colors flex items-center justify-center gap-3 cursor-pointer">
                <span className="material-symbols-outlined text-lg">close</span>
                Reject
              </button>
              <button
                onClick={() => onOpenDetail(request)}
                className="w-full py-4 bg-sky-900/30 border border-sky-500/50 text-sky-100 rounded-lg text-base font-bold hover:bg-sky-900/50 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2 group">
                Explore Further
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <button className="w-full py-4 border border-brand-border rounded-lg text-base font-medium text-brand-text hover:bg-brand-surface-light/10 hover:text-white transition-colors flex items-center justify-center gap-3 cursor-pointer">
                  <span className="material-symbols-outlined text-lg">
                    close
                  </span>
                  Reject
                </button>
                <button className="w-full py-4 bg-brand rounded-lg text-base font-bold text-brand-bg hover:opacity-90 hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer">
                  <span className="material-symbols-outlined text-lg">
                    check_circle
                  </span>
                  Accept
                </button>
              </div>

              <button
                onClick={() => onOpenDetail(request)}
                className="w-full py-4 bg-brand-surface-light/10 border border-brand-surface-light/30 text-brand-text rounded-lg text-base font-medium hover:bg-brand-surface-light/20 hover:text-white transition-colors mb-10 cursor-pointer flex items-center justify-center gap-2 group">
                Explore Further
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </>
          )}

          <div className="flex flex-wrap gap-5 mb-2">
            <span
              className={`px-6 py-3 rounded-full text-sm font-medium border ${
                request.effort === "high"
                  ? "bg-sky-900/20 text-[#C8FCFF] border-[#0d597e]"
                  : "bg-brand-surface text-brand-highlight border-brand-surface-light/30"
              }`}>
              {request.commission} Commission
            </span>
            <span
              className={`px-6 py-3 rounded-full text-sm font-medium border ${
                request.effort === "high"
                  ? "bg-sky-900/20 text-[#C8FCFF] border-[#0d597e]"
                  : "bg-brand-surface text-brand-highlight border-brand-surface-light/30"
              }`}>
              {request.payout}
            </span>
            <span
              className={`px-6 py-3 rounded-full text-sm font-medium border ${
                request.effort === "high"
                  ? "bg-sky-900/20 text-[#C8FCFF] border-[#0d597e]"
                  : "bg-brand-surface text-brand-highlight border-brand-surface-light/30"
              }`}>
              {request.duration}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailModal({ request, onClose }) {
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [bidAmount, setBidAmount] = useState(
    parseInt(request?.commission) || 0
  );
  const [showToast, setShowToast] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  if (!request) return null;

  const handleDecrease = () => {
    if (bidAmount > 0) setBidAmount(bidAmount - 1);
  };

  const handleIncrease = () => {
    if (bidAmount < 100) setBidAmount(bidAmount + 1);
  };

  const handleRaiseCommission = () => {
    setShowToast(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto scrollbar-hide">
      {showToast && (
        <Toast
          message={`Commission raised to ${bidAmount}%`}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="bg-brand-bg border border-brand-surface-light/20 text-brand-text rounded-3xl shadow-2xl w-full max-w-[1200px] p-8 md:p-12 relative my-10 max-h-[90vh] overflow-auto scrollbar-hide">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-brand-text/50 hover:text-brand-primary transition-colors">
          <span className="material-symbols-outlined text-3xl">cancel</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-brand-surface/20 border border-brand-surface-light/10 rounded-2xl w-full aspect-[16/10] mb-8 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-brand-surface-light/20">
                play_circle
              </span>
            </div>
            <div className="space-y-4">
              {[
                {
                  id: "market",
                  title: "Market Fit & Story",
                  content:
                    "Our product fills a critical gap in the market for personalized AI fashion advice, backed by user research showing a 40% increase in confidence.",
                },
                {
                  id: "product",
                  title: "Product Showcase",
                  content:
                    "High-quality demo videos and interactive 3D models allow users to experience the fabric textures and fit before purchasing.",
                },
                {
                  id: "branding",
                  title: "Branding",
                  content:
                    "A modern, minimalist aesthetic centered around confidence and individuality. Our core colors are Deep Emerald and Soft Cream.",
                },
              ].map((section) => (
                <div key={section.id} className="overflow-hidden rounded-xl">
                  <button
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === section.id ? null : section.id
                      )
                    }
                    className={`w-full flex justify-between items-center p-6 text-left group border transition-all duration-300 cursor-pointer ${
                      expandedSection === section.id
                        ? "bg-brand-surface/30 border-brand-surface-light/20"
                        : "bg-brand-surface/10 border-transparent hover:bg-brand-surface/20 hover:border-brand-surface-light/10"
                    }`}>
                    <span
                      className={`text-lg font-medium transition-colors ${
                        expandedSection === section.id
                          ? "text-brand-highlight"
                          : "text-brand-text/90 group-hover:text-brand-text"
                      }`}>
                      {section.title}
                    </span>
                    <span
                      className={`material-symbols-outlined transition-transform duration-300 ${
                        expandedSection === section.id
                          ? "text-brand-highlight rotate-180"
                          : "text-brand-text/50 group-hover:text-brand-highlight"
                      }`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      expandedSection === section.id
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}>
                    <div className="overflow-hidden bg-brand-surface/5">
                      <p className="p-6 text-brand-text/80 leading-relaxed border-t border-brand-surface-light/5">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-8 flex flex-col">
            <div className="bg-brand-surface/10 border border-brand-surface-light/10 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden">
              {isNegotiating ? (
                <div className="animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center justify-center py-8">
                  <h3 className="text-xl font-medium text-brand-text/80 mb-8">
                    Current Commission
                  </h3>

                  <div className="flex items-center gap-6 mb-12">
                    <button
                      onClick={handleDecrease}
                      className="w-16 h-16 rounded-[20px] bg-[#BCFCA1] flex items-center justify-center text-brand-bg hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#BCFCA1]/20">
                      <span className="font-bold text-2xl">-1</span>
                    </button>

                    <span className="text-6xl font-bold text-[#BCFCA1] tabular-nums tracking-tight">
                      {bidAmount}%
                    </span>

                    <button
                      onClick={handleIncrease}
                      className="w-16 h-16 rounded-[20px] bg-[#BCFCA1] flex items-center justify-center text-brand-bg hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#BCFCA1]/20">
                      <span className="font-bold text-2xl">+1</span>
                    </button>
                  </div>

                  <button
                    onClick={handleRaiseCommission}
                    className="w-full py-4 bg-brand-surface border border-brand-surface-light/20 rounded-xl text-lg font-bold text-white hover:bg-brand-surface-light/10 transition-all cursor-pointer shadow-lg">
                    Raise Commission
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-brand-text mb-1">
                    {request.name}
                  </h2>
                  <p className="text-brand-text/60 text-lg mb-8">
                    {request.tagline}
                  </p>
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-brand-primary font-medium mb-2">
                        Problem
                      </h3>
                      <p className="text-brand-text/80 text-sm leading-relaxed">
                        {request.problem}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-brand-primary font-medium mb-2">
                        Solution
                      </h3>
                      <p className="text-brand-text/80 text-sm leading-relaxed">
                        {request.solution}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className={`py-2.5 px-4 rounded-full border border-brand-surface-light/40 text-brand-text/80 font-medium hover:bg-brand-surface/30 hover:text-white transition-colors cursor-pointer ${
                          request.effort === "high" ? "col-span-2" : ""
                        }`}>
                        Decline
                      </button>
                      {request.effort !== "high" && (
                        <button className="py-2.5 px-4 rounded-full border border-brand-primary text-brand-primary font-medium hover:bg-brand-primary hover:text-brand-bg transition-colors cursor-pointer">
                          Accept
                        </button>
                      )}
                    </div>
                    {request.effort === "high" && (
                      <button
                        onClick={() => setIsNegotiating(true)}
                        className="w-full py-3 rounded-full bg-[#C8FCFF] text-blue-900 font-bold transition-colors shadow-sm hover:opacity-90 cursor-pointer">
                        Bid For More %
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="bg-brand-surface/10 border border-brand-surface-light/10 rounded-2xl p-8 flex-grow">
              <h3 className="text-lg font-medium text-brand-text/90 mb-4">
                Recent Updates
              </h3>
              <div className="space-y-2">
                {request.updates &&
                  request.updates.map((update, idx) => (
                    <div
                      key={idx}
                      className="bg-brand-surface p-3 rounded-lg flex items-center gap-3 text-sm text-brand-highlight border border-brand-surface-light/30">
                      <span className="material-symbols-outlined text-sm">
                        {update.icon}
                      </span>
                      {update.text}
                    </div>
                  ))}
                {!request.updates && (
                  <div className="h-8 bg-brand-surface/10 rounded-lg w-full border border-brand-surface-light/10"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
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
