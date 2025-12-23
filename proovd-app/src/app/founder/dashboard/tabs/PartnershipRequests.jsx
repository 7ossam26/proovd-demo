"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const partnerships = [
  {
    name: "Sarah Adams",
    status: "Accepted",
    slug: "accepted",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVwaps97qr_NYyr6X28GHZfuSw5PJ_0HuyFIHZ3nIerNUNwQC-tyDzvRI-F6xx77QdYqGEje8YLng47gC9P0KDNZqbSFCAzxHvYiiHWiuBVBsRHD57ctBOIv-z4raqeQgTkjTUr4Gko9_JEFa_gCc5XW55fucFQIymcgWSg_avpESCoFEvC9IlfnhRfj6aHucuRV-OlolkEJ1XfmGq70P49lEg8t1RoeFufWF99bBQIYgZfxiWQKB9nFEBaZiCypPArWUHEje2UZsA",
    stats: [
      { label: "Followers", value: "200k", icon: "people" },
      { label: "Engagement", value: "4.48%", icon: "insert_chart" },
      { label: "Niche", value: "AI Fashion", icon: "category" },
    ],
  },
  {
    name: "Mike Chen",
    status: "Awaiting Response",
    slug: "awaiting",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVH9Arsi70eDJgncowUKn3vF0z6lM4pd--2l8Kc2uYTLEkrSHAUYfu8UbiLegNRZ1INHnVPFHgKs7lAeDFos0cgqqx8hqKix3ktEmiICb8DiUmwxmotIfmSpNIIpgwZMKF51PnHukawMGyJEje-hXmQ6k6yF6Jzx-6RG6VSklzZa92P7TCXXb-btNye0_JHJD1mQLi2as_UESNCIocLWHd6lcg3PGnIjHTAz-KaVktM8By7HmuJFIgL7dcaedTnJ-OuWQfS_-VzQTi",
    stats: [
      { label: "Followers", value: "52k", icon: "people" },
      { label: "Engagement", value: "6.1%", icon: "insert_chart" },
      { label: "Niche", value: "Tech Review", icon: "category" },
    ],
  },
];

export function PartnershipRequests() {
  return (
    <div className="space-y-8">
      {partnerships.map((partner, index) => (
        <div
          key={index}
          className={cn(
            "bg-brand-surface rounded-[2rem] border shadow-xl p-6 md:p-8 relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-1",
            partner.slug === "awaiting"
              ? "border-yellow-500/20 hover:border-yellow-500/50 shadow-none dark:shadow-none"
              : "border-brand/20 hover:border-brand/50"
          )}>
          <div
            className={cn(
              "absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none opacity-60 bg-gradient-to-br via-transparent to-transparent",
              partner.slug === "awaiting"
                ? "from-yellow-500/10"
                : "from-brand/10"
            )}
          />

          <div className="flex flex-col lg:flex-row gap-8 items-center relative z-10">
            <div className="flex flex-col items-center gap-4 lg:w-1/5 min-w-[200px]">
              <div
                className={cn(
                  "h-28 w-28 rounded-full p-[3px] bg-gradient-to-br flex-shrink-0 relative overflow-hidden shadow-lg",
                  partner.slug === "awaiting"
                    ? "from-yellow-500 via-yellow-500/50 to-transparent"
                    : "from-brand via-brand/50 to-transparent"
                )}>
                <div className="rounded-full overflow-hidden w-full h-full bg-brand-surface">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="object-cover w-full h-full grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-brand-text mb-2 leading-tight">
                  {partner.name}
                </h3>
                <span
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm backdrop-blur-sm",
                    partner.slug === "awaiting"
                      ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20"
                      : "bg-brand/20 text-brand border-brand/20"
                  )}>
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mr-2 animate-pulse",
                      partner.slug === "awaiting"
                        ? "bg-yellow-500"
                        : "bg-brand"
                    )}
                  />
                  {partner.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow w-full items-center">
              {partner.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-brand-bg/50 backdrop-blur-sm rounded-[1.5rem] p-6 flex flex-col justify-center border border-brand-surface-light/10 hover:bg-brand-bg transition-colors group/stat h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-brand-text-muted uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <span
                      className={cn(
                        "material-symbols-outlined text-sm transition-colors",
                        partner.slug === "awaiting"
                          ? "text-brand-text-muted group-hover/stat:text-yellow-500"
                          : "text-brand-text-muted group-hover/stat:text-brand"
                      )}>
                      {stat.icon}
                    </span>
                  </div>
                  <span className="text-3xl font-bold text-brand-text tracking-tight">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-surface-light/10 flex justify-center w-full relative z-10">
            <button
              className={cn(
                "flex items-center gap-2 transition-all text-sm font-semibold group/btn",
                partner.slug === "awaiting"
                  ? "text-brand-text-muted hover:text-yellow-500"
                  : "text-brand-text-muted hover:text-brand"
              )}>
              View Details
              <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
