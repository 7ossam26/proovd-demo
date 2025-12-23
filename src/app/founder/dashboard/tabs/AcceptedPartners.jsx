"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const partners = [
  {
    name: "Alex Thompson",
    initials: "AT",
    isIcon: true,
    niche: "Tech",
    unitsSold: 24,
    color: "primary",
  },
  {
    name: "Sarah Jenkins",
    initials: "SJ",
    isIcon: false,
    niche: "Lifestyle",
    unitsSold: 48,
    color: "secondary",
  },
];

export function AcceptedPartners() {
  const router = useRouter();

  const handleAction = (label) => {
    if (label === "View Metrics") {
      router.push("/founder/campaigns/progress");
    } else if (label === "Product Page") {
      router.push("/product");
    }
  };

  return (
    <div className="space-y-8">
      {partners.map((partner, index) => (
        <div
          key={index}
          className="bg-brand-surface rounded-3xl p-8 border border-brand-surface-light/10 shadow-sm relative overflow-hidden group hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-all duration-700 pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-brand-surface-light/5 flex items-center justify-center overflow-hidden border-none shadow-inner">
                {partner.isIcon ? (
                  <svg
                    className="w-20 h-20 text-brand-text-muted"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                ) : (
                  <span className="text-4xl text-brand-text-muted font-bold">
                    {partner.initials}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-grow w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand-text mb-1">
                    {partner.name}
                  </h3>
                  <span className="inline-block px-3 py-1 text-[10px] font-bold rounded bg-brand-surface-light/10 text-brand-primary tracking-wide uppercase">
                    {partner.niche}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-light text-brand-text tracking-tight">
                  {partner.unitsSold}{" "}
                  <span className="font-thin text-brand-text-muted text-2xl md:text-3xl">
                    UNITS SOLD
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Product Page", icon: "play_arrow" },
                  { label: "View Metrics", icon: "ssid_chart" },
                  { label: "Socials", icon: "share" },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleAction(action.label)}
                    className="flex flex-row sm:flex-col items-center sm:items-start justify-center sm:justify-between p-5 rounded-2xl bg-brand-surface-light/5 border border-brand-surface-light/5 hover:bg-brand-surface-light/10 hover:border-brand-primary/30 transition-all duration-300 group/btn h-full min-h-[100px] text-left cursor-pointer">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-surface-light/10 text-brand-text-muted mb-0 sm:mb-4 mr-4 sm:mr-0 shadow-sm group-hover/btn:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-xl">
                        {action.icon}
                      </span>
                    </div>
                    <span className="text-lg font-medium text-brand-text">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
