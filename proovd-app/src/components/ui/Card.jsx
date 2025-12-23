"use client";

import { cn } from "@/lib/utils";

export function Card({ className, children, hoverEffect = false, ...props }) {
  return (
    <div
      className={cn(
        "bg-brand-surface text-brand-text rounded-2xl border border-brand-surface-light/20 p-6 shadow-sm overflow-hidden",
        hoverEffect &&
          "transition-all duration-300 hover:shadow-lg hover:border-brand-primary/30 hover:-translate-y-1",
        className
      )}
      {...props}>
      {children}
    </div>
  );
}
