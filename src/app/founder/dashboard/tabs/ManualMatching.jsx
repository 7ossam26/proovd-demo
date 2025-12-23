"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

import { useState } from "react";
import { Toast } from "@/components/ui/Toast";

const matches = [
  {
    name: "Alex Thompson",
    role: "Tech",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMJptc05XYAftOqyis6IzadveDTejcyERmVqxHdfPmPDL7EXiNsku8hj83aDEBkxCqa1OaSZub-wdyWAEJbRarsVYSBQvQOm2vx9AKBqYe3BkWviqzsLlFtGPOPizzpA1Ys5TC_ttdnRk6AopSpVGbAqVHPUsZMJiON3Fjgo-hMp3cZYvM2dgAJUKYLIgBcpp10V0Tj7H1aWSUnFAcj3z2AUF8Qaul53Kzsw1E083wDz641YVfBMGixeUV_mngh_YCDpqx-RXyCzgK",
    stats: [
      { label: "50K", sub: "followers" },
      { label: "6.1%", sub: "engagement" },
    ],
  },
  {
    name: "Sarah Jenning",
    role: "Lifestyle & Tech",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7Crmx9RCAPD3oezTC9VUOY3ahBtIEas8ytFomf6D_0Y7Obx9z2CwBpRR4VmGb_a9YyXGIOzSHnUQoPA_4eqZyPD19R1OfxFaFd1-ugTbU0xO54t4BxMNwWoaB9OUh5RvhgNdabXOHDq792zyoDwELzA3ERS0g9HypsIxoqCG_MvWShoLMpJUSzwWtOhZwxyINzQFALsmxBoFiivT5P2jrhEvVy_OYSUWTJ2Pmj_61Wyd0DbebYpHZRInDu6T0aCYPsXib8rXLHZmo",
    stats: [
      { label: "120K", sub: "followers" },
      { label: "4.8%", sub: "engagement" },
    ],
  },
  {
    name: "Marcus Chen",
    role: "SaaS Reviews",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGtvDTWt2gDmrhowElPjmALGO8kJcC42vA3OWWM5-nO3ZR8pyBGQWnTcm3bjYDHrIVstlsfyCBNk_i_Rug0GDrx_UZAgQcIg2pizF02W6pUQujFpo_f9OHf4cfPwOJD8ifLvingXZ_2iCITmXIgy29TsYPSJTv5WHNWYSG2kY_c7De046Y_KqdBuE_A1egD2bCIJrcHDGesT7D4rBL9O4ddFN1SenGYwanJ6vWfjlh8KNLuqhjEjA50oMMb4DqdPyT1G7VfKTxNicg",
    stats: [
      { label: "15K", sub: "followers" },
      { label: "8.5%", sub: "engagement" },
    ],
  },
];

export function ManualMatching() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="space-y-6">
      {matches.map((match, index) => (
        <div
          key={index}
          className="bg-brand-surface rounded-[2rem] p-6 sm:p-8 shadow-sm border border-brand-surface-light/10 flex flex-col sm:flex-row items-start gap-6 hover:border-brand-primary/30 transition-all duration-300">
          <div className="flex-shrink-0">
            <img
              src={match.image}
              alt={match.name}
              className="h-20 w-20 rounded-full object-cover border-2 border-brand-surface-light/10 bg-brand-surface-light/5"
            />
          </div>
          <div className="flex-grow w-full">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-brand-text">
                  {match.name}
                </h3>
                <p className="text-sm text-brand-text-muted">{match.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {match.stats.map((stat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-surface-light/5 text-brand-text-muted border border-brand-surface-light/10">
                  {stat.label} {stat.sub}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowToast(true)}
                className="w-full bg-brand hover:opacity-90 text-brand-bg font-bold py-3 px-4 rounded-xl shadow-lg shadow-brand/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer">
                Send Pitch
              </button>
              <div className="flex justify-center">
                <button className="flex items-center justify-center gap-2 text-sm font-medium text-brand-text-muted hover:text-white bg-brand-surface-light/5 hover:bg-brand-surface-light/10 border border-brand-surface-light/10 hover:border-brand-primary/30 transition-all duration-300 py-2.5 px-4 rounded-xl w-full cursor-pointer group">
                  <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
                    visibility
                  </span>
                  <span>Socials</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {showToast && (
        <Toast message="pitch with sent" onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
