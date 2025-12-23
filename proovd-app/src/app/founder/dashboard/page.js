"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { PartnershipRequests } from "./tabs/PartnershipRequests";
import { ManualMatching } from "./tabs/ManualMatching";
import { AcceptedPartners } from "./tabs/AcceptedPartners";

const tabs = [
  { id: "requests", label: "Partnership Requests" },
  { id: "manual", label: "Manual Matching" },
  { id: "accepted", label: "Accepted Partners" },
];

export default function FounderDashboard() {
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <div className="w-full">
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-text mb-2">
            Affiliate Matches
          </h1>
          <p className="text-brand-text-muted text-sm font-medium">
            Send pitches to matched affiliates and track their responses
          </p>
        </div>
      </header>

      {/* Stats Grid MVP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Matches", value: "6", icon: "person" },
          { label: "Pitches Sent", value: "18", icon: "email" },
          { label: "Response Rate", value: "7", icon: "pie_chart" },
          { label: "Top Performer", value: "25%", icon: "workspace_premium" },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-16 h-12 rounded-2xl bg-brand-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-brand-text-muted">
                {stat.icon}
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-text">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-brand-text-muted uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Tab Switcher */}
        <div className="flex bg-brand-surface p-1 rounded-xl shadow-sm border border-brand-surface-light/10 w-full md:w-auto relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg transition-all z-10",
                activeTab === tab.id
                  ? "text-brand-bg bg-brand-primary"
                  : "text-brand-text-muted hover:text-brand-text"
              )}>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-brand-primary rounded-lg shadow-sm -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={activeTab === tab.id ? "text-brand-bg" : ""}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-48">
          <button className="w-full flex justify-between items-center px-4 py-2 bg-brand-surface border border-brand-surface-light/10 rounded-xl text-sm font-medium text-brand-text shadow-sm hover:border-brand-surface-light/30 transition-colors">
            <span>Sort</span>
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}>
          {activeTab === "requests" && <PartnershipRequests />}
          {activeTab === "manual" && <ManualMatching />}
          {activeTab === "accepted" && <AcceptedPartners />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
