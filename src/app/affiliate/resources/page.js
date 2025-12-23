"use client";

import { Button } from "@/components/ui/Button";

const resources = [
  {
    category: "Brand Guidelines",
    icon: "palette",
    description:
      "Download our official logos, color palettes, and typography rules.",
    action: "Download Kit",
  },
  {
    category: "Visual Assets",
    icon: "image",
    description: "High-quality product images, mockups, and lifestyle shots.",
    action: "Browse Gallery",
  },
  {
    category: "Content Templates",
    icon: "article",
    description:
      "Pre-written email copies, social media captions, and blog drafts.",
    action: "View Templates",
  },
  {
    category: "Success Stories",
    icon: "trending_up",
    description: "Case studies and testimonials from top-performing partners.",
    action: "Read Stories",
  },
  {
    category: "Webinars & Training",
    icon: "school",
    description:
      "Watch recorded sessions on how to maximize your partnership earnings.",
    action: "WatchNow",
  },
  {
    category: "FAQs & Support",
    icon: "help",
    description: "Common questions and direct support contact for partners.",
    action: "Get Help",
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, i) => (
          <div
            key={i}
            className="bg-brand-surface rounded-2xl p-8 border border-brand-surface-light/20 hover:border-brand/30 transition-all group flex flex-col items-start gap-4 shadow-sm hover:shadow-md">
            <div className="w-14 h-14 bg-brand-surface-light/10 rounded-xl flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">
                {res.icon}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-2 group-hover:text-brand transition-colors">
                {res.category}
              </h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                {res.description}
              </p>
            </div>
            <div className="mt-auto w-full pt-4">
              <Button
                variant="outline"
                fullWidth
                className="group-hover:bg-brand-surface-light/10 group-hover:text-brand group-hover:border-brand/30">
                {res.action}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-surface/30 border border-brand-surface-light/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-brand-text mb-2">
            Need Custom Assets?
          </h3>
          <p className="text-brand-text-muted">
            Request specific materials for your unique campaign needs.
          </p>
        </div>
        <Button className="bg-brand text-brand-bg hover:opacity-90 font-bold px-8">
          Contact Partner Support
        </Button>
      </div>
    </div>
  );
}
