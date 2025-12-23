"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "story", name: "Story" },
  { id: "faq", name: "FAQ" },
  { id: "updates", name: "Updates" },
];

const rewards = [
  {
    price: "$25",
    backers: "100 backers",
    title: "Reward Tier 1",
    description: "Description of what is included in this reward tier.",
    delivery: "Dec 2025",
  },
  {
    price: "$50",
    backers: "200 backers",
    title: "Reward Tier 2",
    description: "Description of what is included in this reward tier.",
    delivery: "Dec 2025",
  },
  {
    price: "$75",
    backers: "300 backers",
    title: "Reward Tier 3",
    description: "Description of what is included in this reward tier.",
    delivery: "Dec 2025",
  },
];

export default function ProductPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("story");
  const [showBackOptions, setShowBackOptions] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-text antialiased">
      {/* Header Section */}
      <header className="relative bg-brand-bg h-auto md:h-[360px] flex flex-col justify-between px-6 py-8 md:px-12 lg:px-24 border-b border-brand-surface/30">
        <div className="flex justify-between w-full mb-8 md:mb-0">
          <div className="relative">
            <button
              onClick={() => setShowBackOptions(!showBackOptions)}
              onBlur={() => setTimeout(() => setShowBackOptions(false), 200)}
              className="p-2 rounded-full hover:bg-brand-surface/30 transition text-brand-text-muted hover:text-brand">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            {showBackOptions && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-brand-surface border border-brand-border rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => router.push("/affiliate/partnerships/active")}
                  className="w-full text-left px-4 py-3 text-sm text-brand-text hover:bg-white/5 flex items-center gap-3 transition-colors border-b border-brand-border/30">
                  <span className="material-symbols-outlined text-lg">
                    storefront
                  </span>
                  Back to Partnerships
                </button>
                <button
                  onClick={() => router.push("/founder/dashboard")}
                  className="w-full text-left px-4 py-3 text-sm text-brand-text hover:bg-white/5 flex items-center gap-3 transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    dashboard
                  </span>
                  Back to Dashboard
                </button>
              </div>
            )}
          </div>
          <button className="p-2 rounded-full hover:bg-brand-surface/30 transition text-brand-text-muted hover:text-brand">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-4 md:mb-8">
          <div className="flex items-center gap-5 mb-6 md:mb-0 w-full md:w-auto">
            <div className="w-16 h-16 rounded-full bg-brand-surface/20 ring-2 ring-brand/20 flex items-center justify-center overflow-hidden shrink-0">
              <img
                alt="Creator Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRnpmAvFAHcW2G80oopk3k9-TsexnR5nb7jKGUi342EcCgkbsm9Ua_xbpN1hSANbLur94nbb4X9Ge4C6nkDYMXIju9M5q7Aoe582e5Vc5MqIsMs9wa3giHUS8ppnhqYdQslZYEyyMbEzN7PPeKrrthj5QAI4XmAlLPsxzYp8YbMT8MPxjmz2Vkesmrz90GVGJMXL1MNpLN7I_0TynpDVrLyR82o7Wg7bf0W1LDsZRe92AeXdgTrkcNUc5zRjpkdJ7TvPDFmfaF3j2R"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-text tracking-tight">
                Alex Thompson
              </h1>
              <p className="text-sm text-brand-text-muted font-medium">Tech</p>
            </div>
          </div>
          <div className="text-left md:text-right w-full md:w-auto">
            <div className="mb-2">
              <span className="text-4xl font-bold text-brand-text block tracking-tight">
                $45,000
              </span>
              <span className="text-xs text-brand-text-muted font-medium uppercase tracking-wider">
                pledged of $100,000
              </span>
            </div>
            <div className="flex items-baseline justify-start md:justify-end gap-2">
              <span className="text-3xl font-light text-[#e0e0e0]">1,234</span>
              <span className="text-xs text-brand-text-muted uppercase tracking-wider font-medium">
                Backers
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 -mt-12 pb-20 space-y-6 relative z-10">
        {/* Progress Section */}
        <section className="bg-brand-bg rounded-xl p-6 md:p-8 border border-brand-surface/50 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-brand-surface/30 flex items-center justify-center text-brand-text-muted">
              <span className="material-symbols-outlined text-lg">person</span>
            </div>
            <div>
              <h3 className="font-semibold text-brand-text text-base">
                Alex Thompson
              </h3>
              <p className="text-xs text-brand-text-muted">Tech</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-t border-brand-surface/30 pt-8">
            <div className="flex flex-col justify-between">
              <div>
                <span className="block text-3xl font-bold text-brand-text mb-1 tracking-tight">
                  $45,000
                </span>
                <span className="text-xs text-brand-text-muted font-medium uppercase tracking-wide">
                  pledged of $100,000
                </span>
              </div>
              <div className="w-full bg-brand-surface/30 rounded-full h-1.5 mt-4 overflow-hidden">
                <div
                  className="bg-brand h-full rounded-full"
                  style={{ width: "45%" }}></div>
              </div>
            </div>
            <div className="flex flex-col justify-start pt-1">
              <span className="block text-3xl font-bold text-brand-text mb-1 tracking-tight">
                1,234
              </span>
              <span className="text-xs text-brand-text-muted font-medium uppercase tracking-wide mb-1">
                Backers
              </span>
              <div className="flex items-center text-xs text-brand-text-muted gap-1 mt-1">
                <span className="material-symbols-outlined text-[14px]">
                  group
                </span>
                <span>+123 Today</span>
              </div>
            </div>
            <div className="flex flex-col justify-start pt-1">
              <span className="block text-3xl font-bold text-brand-text mb-1 tracking-tight">
                14
              </span>
              <span className="text-xs text-brand-text-muted font-medium uppercase tracking-wide mb-1">
                Days to go
              </span>
              <div className="flex items-center text-xs text-brand-text-muted gap-1 mt-1">
                <span className="material-symbols-outlined text-[14px]">
                  schedule
                </span>
                <span>Ends March 15</span>
              </div>
            </div>
          </div>
          <button className="w-full py-4 bg-brand-surface/40 hover:bg-brand-surface/60 text-brand-text font-semibold rounded-[4px] transition-all shadow-lg uppercase tracking-wider text-sm border border-brand-surface hover:border-brand">
            Back this Project
          </button>
        </section>

        {/* Reward Selection */}
        <section className="bg-brand-bg rounded-xl p-6 md:p-8 border border-brand-surface/50 shadow-2xl shadow-black/50">
          <h2 className="text-lg font-bold text-brand-text mb-6 tracking-tight">
            Select your reward
          </h2>
          <div className="space-y-4">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="border border-brand-surface/30 rounded-lg p-6 hover:border-brand transition duration-300 cursor-pointer group bg-[#0c1410]">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-bold text-brand-text-muted group-hover:text-brand transition-colors">
                    {reward.price}
                  </span>
                  <span className="text-xs text-brand-surface-light font-medium uppercase">
                    {reward.backers}
                  </span>
                </div>
                <h3 className="font-bold text-brand-text mb-2 text-lg">
                  {reward.title}
                </h3>
                <p className="text-sm text-brand-text-muted mb-4 leading-relaxed">
                  {reward.description}
                </p>
                <div className="flex items-center text-xs text-[#6B8E78] gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[14px]">
                    schedule
                  </span>
                  <span>Est. Delivery: {reward.delivery}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Media Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 bg-[#0c1410] rounded-xl border border-brand-surface/30"></div>
          <div className="flex flex-col gap-4 h-64">
            <div className="flex-1 bg-[#0c1410] rounded-xl border border-brand-surface/30"></div>
            <div className="flex-1 flex gap-4">
              <div className="flex-1 bg-[#0c1410] rounded-xl border border-brand-surface/30"></div>
              <div className="flex-1 bg-[#0c1410] rounded-xl border border-brand-surface/30"></div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-brand-bg rounded-xl p-6 md:p-8 border border-brand-surface/50 shadow-2xl shadow-black/50">
          <div className="flex gap-8 mb-8 border-b border-brand-surface/30 pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-0 py-4 border-b-2 text-sm transition tracking-wide",
                  activeTab === tab.id
                    ? "border-brand-text text-brand-text font-semibold"
                    : "border-transparent text-brand-text-muted font-medium hover:border-brand hover:text-brand"
                )}>
                {tab.name}
              </button>
            ))}
          </div>
          <article className="prose prose-invert max-w-none text-brand-text-muted">
            <h2 className="text-2xl font-bold text-brand-text mb-6 tracking-tight">
              About this project
            </h2>
            <p className="mb-6 leading-7 text-sm text-brand-text-muted font-light">
              In the bustling city of Technopolis, a group of visionary
              engineers and computer scientists gathered in a small, dimly lit
              garage. They shared a common dream: to revolutionize the world
              with artificial intelligence. It all began when Dr. Emily Carter,
              a renowned AI researcher, stumbled upon a groundbreaking algorithm
              while working late into the night. This discovery sparked the idea
              for a company that would harness the power of AI to solve
              real-world problems. With limited resources but boundless
              enthusiasm, the team worked tirelessly, fueled by countless cups
              of coffee and the unwavering belief in their mission. As word of
              their innovation spread, investors took notice, and soon, the
              fledging company secured its first round of funding. This pivotal
              moment marked the beginning of a journey that would see the
              company grow from a humble startup to a leader in the AI industry,
              transforming industries and improving lives along the way.
            </p>
            <p className="mb-8 leading-7 text-sm text-brand-text-muted font-light">
              In the bustling city of Technopolis, a group of visionary
              engineers and computer scientists gathered in a small, dimly lit
              garage. They shared a common dream: to revolutionize the world
              with artificial intelligence. It all began when Dr. Emily Carter,
              a renowned AI researcher, stumbled upon a groundbreaking algorithm
              while working late into the night. This discovery sparked the idea
              for a company that the AI industry, transforming industries and
              improving lives along the way.
            </p>
            <div className="w-full h-80 bg-[#0c1410] rounded-lg mb-8 border border-brand-surface/30"></div>
            <p className="leading-7 text-sm text-brand-text-muted font-light">
              In the bustling city of Technopolis, a group of visionary
              engineers and computer scientists gathered in a small, dimly lit
              garage. They shared a common dream: to revolutionize the world
              with artificial intelligence. It all began when Dr. Emily Carter,
              a renowned AI researcher, stumbled upon a groundbreaking algorithm
              while working late into the night. This discovery sparked the idea
              for a company that the AI industry, transforming industries and
              improving lives along the way.
            </p>
          </article>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-brand-surface-light text-xs font-medium tracking-wide border-t border-brand-surface/10 mt-10">
        © 2025 Proovd Dev Team. All rights reserved.
      </footer>
    </div>
  );
}
