"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Partnership Requests", href: "/affiliate/partnerships/requests" },
  { name: "Active Partnerships", href: "/affiliate/partnerships/active" },
  { name: "Resources", href: "/affiliate/resources" },
];

export default function AffiliateLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12">
      {/* Header */}
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-3 text-brand-text">
            Manage Partnerships
          </h1>
          <p className="text-brand-text-muted">
            Review requests and manage your brand partnerships
          </p>
        </div>
      </header>

      {/* Key Metrics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-14 bg-brand-surface rounded-2xl flex items-center justify-center border border-brand-surface-light/30">
            <span className="material-symbols-outlined text-brand text-3xl">
              person
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-text">12</div>
            <div className="text-sm text-brand-text-muted font-medium">
              Active founders
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="w-20 h-14 bg-brand-surface rounded-2xl flex items-center justify-center border border-brand-surface-light/30">
            <span className="material-symbols-outlined text-brand text-3xl">
              person_add
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-text">5</div>
            <div className="text-sm text-brand-text-muted font-medium">
              Pending Requests
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="w-20 h-14 bg-brand-surface rounded-2xl flex items-center justify-center border border-brand-surface-light/30">
            <span className="material-symbols-outlined text-brand text-3xl">
              play_arrow
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-text">7</div>
            <div className="text-sm text-brand-text-muted font-medium">
              Active Campaigns
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="w-20 h-14 bg-brand-surface rounded-2xl flex items-center justify-center border border-brand-surface-light/30">
            <span className="material-symbols-outlined text-brand text-3xl">
              attach_money
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-text">25%</div>
            <div className="text-sm text-brand-text-muted font-medium">
              Average Commission
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-12">
        <div className="flex sm:inline-flex bg-brand-surface p-1.5 rounded-xl gap-1 border border-brand-surface-light/20 w-full sm:w-auto items-center">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex-1 px-2 md:px-6 py-2.5 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all flex items-center justify-center text-center leading-tight whitespace-normal min-h-[44px]",
                  isActive
                    ? "bg-brand text-brand-text shadow-sm"
                    : "text-brand-text/60 hover:text-brand-text hover:bg-white/5"
                )}>
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
